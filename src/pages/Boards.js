import React from "react";
import { connect } from "react-redux";
import BoardHeader from "../cmps/BoardHeader.jsx";
import Board from '../cmps/Board.jsx'
import '../style/pages/boards.css'
import SocketService from '../services/SocketService'

import { loadBoards, setCurrBoard, removeBoard } from "../../src/actions/boardActions";
import { loadUsers } from '../../src/actions/UserActions'
class BoardApp extends React.Component {
    state = {
        currBoard: null
    }




    componentDidMount = async () => {

        this.props.loadUsers();
        var allBoards = await this.props.loadBoards()
        this.loadboards()
        const boardId = this.props.currBoard._id
        // SocketService.emit('boardViewed', boardId)
        SocketService.on('doRefresh', async data => {
            await this.props.loadBoards()
            let board = this.getBoardByID(boardId)
            this.setBoard(board)
        })


    }

    componentWillUnmount() {
        SocketService.off('doRefresh', data => {
            // await this.props.loadBoards()
            // let board = this.getBoardByID(boardId)
            // this.setBoard(board)
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let board = this.getBoardByID(this.props.match.params.id)
            this.setBoard(board)
        }
        if (JSON.stringify(this.props.currBoard) !== JSON.stringify(prevProps.currBoard)) {
            this.loadboards()
        }

    }

    loadboards = () => {
        const { boards } = this.props;
        const id = this.props.match.params.id ? this.props.match.params.id : null
        let board = boards[0]
        console.log("BoardApp -> loadboards -> board", board)
        if (id) {
            console.log("BoardApp -> loadboards -> id", id)

            board = this.getBoardByID(id)
        }
        this.setBoard(board)
    }

    getBoardByID = (id) => {
        const { boards } = this.props;
        const board = boards.find(board => {
            return board._id === id
        })
        return board
    }
    setBoard(board) {
        this.props.setCurrBoard(board)
        this.setState({ currBoard: board })
    }





    // onFilter = (filterBy) => {
    //     console.log("BoardApp -> onFilter -> filterBy", filterBy);

    //     this.props.loadBoards(filterBy);
    // };

    // onDeleteBoard = (boardId) => {
    //     this.props.removeBoard(boardId);
    //     this.props.loadBoards();
    // };
    removeBoard = async (boardId) => {
        console.log("BoardApp -> removeBoard -> boardId", boardId)
        await this.props.removeBoard(boardId)

        await this.props.loadBoards()
        await this.props.history.push('/board/')
        await this.loadboards()
    }
    render() {

        const { currBoard } = this.state;
        return (
            <>

                {/* <Filter onSetFilter={this.onFilter} filterBy={filterBy}></Filter> */}
                {currBoard && <BoardHeader removeBoard={this.removeBoard} board={currBoard}></BoardHeader>}
                {currBoard && <Board board={currBoard} ></Board>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.userBoards.board,
        currBoard: state.userBoards.currBoard

    };
};
const mapDispatchToProps = {
    loadBoards,
    setCurrBoard,
    removeBoard,
    loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp);
