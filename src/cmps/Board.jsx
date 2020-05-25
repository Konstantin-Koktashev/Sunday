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
import DoughnutChart from "./DoughnutChart.jsx";

class Board extends Component {
  sortColumnsByBox = async (order) => {
    let board = localBoardService.sortColumnsByBox(this.props.currBoard, order);
    this.props.saveBoard(board);
    this.props.setCurrBoard(board);
    await this.props.loadBoards();
  };

  get boardToDisplay() {
    const {filterByText , currBoard} = this.props
    return localBoardService.filter(currBoard ,filterByText) 

    // return filteredBoard
  }
  render() {
    const board = this.boardToDisplay
    return (
      <>
        <GroupList
          sortColumnsByBox={this.sortColumnsByBox}
          groups={board.groups}
          board={board}
        />
        <DoughnutChart board={board} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard,
    filterByText : state.userBoards.filterByText
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
