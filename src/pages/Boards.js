import React from "react";
import { connect } from "react-redux";
import BoardHeader from "../cmps/BoardHeader.jsx";
import Board from '../cmps/Board.jsx'
import '../style/pages/boards.css'

import { loadBoards , setCurrBoard } from "../../src/actions/boardActions";
class BoardApp extends React.Component {
    state = {
        currBoard: null
    }




    componentDidMount = async () => {
        var allBoards = await this.props.loadBoards()
        console.log("BoardApp -> componentDidMount -> allBoards", this.props.boards)
        this.loadboards()

    }
    componentDidUpdate(prevProps) {
        console.log('update?')
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let board = this.getBoardByID(this.props.match.params.id)
            this.setBoard(board)
        }
        if(this.props.boards !== prevProps.boards){
            console.log('check')
            let board = this.getBoardByID(this.props.match.params.id)
            this.setBoard(board)
        }
        console.log('currBoardfromStore:' , this.props.currBoard)
    }

    loadboards = () => {
        const { boards } = this.props;
        const id = this.props.match.params.id ? this.props.match.params.id : null
        let board = boards[0]
        if (id) {
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

    render() {
        
        const { currBoard } = this.state;
        return (
            <>
                {/* <Filter onSetFilter={this.onFilter} filterBy={filterBy}></Filter> */}
                {currBoard && <BoardHeader board={currBoard}></BoardHeader>}
                {currBoard && <Board board={currBoard} ></Board>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.userBoards.board,
        currBoard:state.userBoards.currBoard

    };
};
const mapDispatchToProps = {
    loadBoards,
    setCurrBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp);
