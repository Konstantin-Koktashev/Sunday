import React from "react";
import { connect } from "react-redux";
import BoardList from "../cmps/BoardList.jsx";


// import { loadBoards, setFilterBy, removeBoard } from "../store/boardActions.js";

export class BoardApp extends React.Component {
    componentDidMount = () => {
        // console.log("BoardApp -> componentDidMount -> this.props", this.props.user);

        // if (!this.props.user) this.props.history.push("/login");
        // this.props.loadBoards();
    };

    // onFilter = (filterBy) => {
    //     console.log("BoardApp -> onFilter -> filterBy", filterBy);

    //     this.props.loadBoards(filterBy);
    // };

    // onDeleteBoard = (boardId) => {
    //     this.props.removeBoard(boardId);
    //     this.props.loadBoards();
    // };

    render() {
        const { boards } = this.props;


        return (
            <section className="main-board-container">
                {/* <Filter onSetFilter={this.onFilter} filterBy={filterBy}></Filter> */}


                {boards ? (
                    <BoardList boards={boards}></BoardList>
                ) : (
                        <p>No boards!</p>
                    )}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.board,

    };
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BoardApp);
