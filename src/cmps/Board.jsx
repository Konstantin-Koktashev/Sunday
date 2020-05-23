import GroupList from "./GroupList.jsx";
import { connect } from "react-redux";
import React, { Component } from "react";
import localBoardService from "../services/localBoardService";
import {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
} from "../actions/boardActions";
import boardService from "../../src/actions/boardActions";
import HttpService from "../../src/services/HttpService";
import AddGroup from "./AddGroup";
import FilterByText from "./FilterByText.jsx";

class Board extends Component {
  sortColumnsByBox = (order) => {
    let board = localBoardService.sortColumnsByBox(this.props.currBoard, order);
    this.props.saveBoard(board);
    this.props.setCurrBoard(board);
    this.props.loadBoards();
  };

  render() {
    return (
      <>
      <FilterByText currBoard={this.props.currBoard}/>
        {/* <h3>Board name:{board.name}</h3>
      <h3>Board name:{board._id}</h3> */}
        {/* <AddGroup board={this.props.board}></AddGroup> */}
        <GroupList
          sortColumnsByBox={this.sortColumnsByBox}
          groups={this.props.board.groups}
          board={this.props.board}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
