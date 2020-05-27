import React from "react";
import { connect } from "react-redux";
import BoardHeader from "../cmps/Board/BoardHeader.jsx";
import Board from '../cmps/Board/Board.jsx'
import '../style/pages/boards.css'
import SocketService from '../services/SocketService'

import { loadBoards, setCurrBoard, removeBoard } from "../actions/BoardActions"
import { loadUsers } from '../../src/actions/UserActions'
import DropZone, { DropFileToAsk } from "../cmps/Tasks/DropZone.jsx";
class BoardApp extends React.Component {
    state = {
        currBoard: null,
        chartIsOpen: false,
    }




    componentDidMount = async () => {

        // if (this.props.currBoard && !this.props.currBoard._id || !this.props.currBoard) return

        // var allBoards = await this.props.loadBoards()
        let allBoards = this.props.boards
        await this.loadboards()
        if (this.props.currBoard) {
            const boardId = this.props.currBoard._id
            SocketService.emit('boardViewed', boardId)
        }
        SocketService.on('doRefresh', this.loadAndSetBoards)


    }
    toggleChart = () => {
        this.setState(({ chartIsOpen }) => ({
            chartIsOpen: !chartIsOpen,
        }));
    };


    loadAndSetBoards = () => {
        const boardId = this.props.currBoard._id
        this.props.loadBoards()
        let board = this.getBoardByID(boardId)
        this.setBoard(board)

    }

    componentWillUnmount() {
        SocketService.off('doRefresh', this.loadAndSetBoards)
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





    loadboards = async () => {
        const { boards } = this.props;
        const id = this.props.match.params.id ? this.props.match.params.id : null
        if (boards && boards.length > 0) {

            let board = boards[0]
            if (id) {
                board = this.getBoardByID(id)
            }
            this.setBoard(board)
        }
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

    removeBoard = async (boardId) => {
        console.log("BoardApp -> removeBoard -> boardId", boardId)
        await this.props.removeBoard(boardId)

        await this.props.loadBoards()
        await this.props.history.push('/board/')
        await this.loadboards()
    }
    removeHistory = () => {
        const { boards } = this.props;
        const { currBoard } = this.state;
        boards.forEach(board => {
            const historyToRemoveIdx = board.history.findIndex(history => history.boardId === currBoard.id)
            board.history.forEach(history => {
                board.history.splice(historyToRemoveIdx, 1)
            })
        })
    }
    render() {

        const { currBoard } = this.state;
        return (
            <>

                {/* <Filter onSetFilter={this.onFilter} filterBy={filterBy}></Filter> */}
                {currBoard && <BoardHeader chartIsOpen={this.state.chartIsOpen} toggleChart={this.toggleChart} removeBoard={this.removeBoard} board={currBoard} user={this.props.user}></BoardHeader>}
                {currBoard && <Board board={currBoard} chartIsOpen={this.state.chartIsOpen} ></Board>}
                {/* <DropZone></DropZone> */}
            </>
        );
    }
}



const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.userBoards.board,
        currBoard: state.userBoards.currBoard,
        user: state.user.loggedInUser

    };
};
const mapDispatchToProps = {
    loadBoards,
    setCurrBoard,
    removeBoard,
    loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp);
