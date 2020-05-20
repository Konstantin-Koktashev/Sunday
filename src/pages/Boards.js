import React from "react";
import { connect } from "react-redux";
import BoardHeader from "../cmps/BoardHeader.jsx";
import Board from '../cmps/Board.jsx'
import '../style/pages/boards.css'
// import { loadBoards, setFilterBy, removeBoard } from "../store/boardActions.js";
class BoardApp extends React.Component {
    state = {
        currBoard: null
    }
    componentDidMount = () => {
        const { boards } = this.props;
        const id = this.props.match.params.id ? this.props.match.params.id : null
        let board = boards[0]
        if (id) {
            board = this.getBoardByID(id)
        }
        this.setBoard(board)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let board = this.getBoardByID(this.props.match.params.id)
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
        const { boards } = this.props;


        return (
            <section className="main-board-container">
                {/* <Filter onSetFilter={this.onFilter} filterBy={filterBy}></Filter> */}
                {currBoard && <BoardHeader board={currBoard}></BoardHeader>}
                {currBoard && <Board board={currBoard} ></Board>}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.userBoards.board,
    };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp);
