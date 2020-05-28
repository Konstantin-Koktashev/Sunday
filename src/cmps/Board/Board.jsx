import GroupList from "../Tasks/GroupList.jsx";
import { connect } from "react-redux";
import React, { Component } from "react";
import LocalBoardService from "../../services/LocalBoardService";
import {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
} from "../../actions/BoardActions";
import DoughnutChart from "../Statistics/DoughnutChart";
import RadarChart from "../Statistics/RadarChart";

class Board extends Component {
  state = {};

  sortColumnsByBox = async (order) => {
    let board = LocalBoardService.sortColumnsByBox(this.props.currBoard, order);
    this.props.saveBoard(board);
    this.props.setCurrBoard(board);
    await this.props.loadBoards();
  };

  get boardToDisplay() {
    const { filterByText, currBoard } = this.props;
    return LocalBoardService.filter(currBoard, filterByText);

    // return filteredBoard
  }
  RadarChart;
  getViewByType = () => {
    let viewType = this.props.viewType;
    let view;
    switch (viewType) {
      case "radar":
        view = <RadarChart board={this.props.currBoard} />;
        break;
      case "pie":
        view = <DoughnutChart board={this.props.currBoard} />;
        break;
      default:
        view = (
          <GroupList
            sortColumnsByBox={this.sortColumnsByBox}
            groups={this.props.currBoard.groups}
            board={this.props.currBoard}
          />
        );
    }
    return view;
  };

  render() {
    const board = this.boardToDisplay;
    return (
      <>
        {this.getViewByType()}
        {/* {!this.props.chartIsOpen ? (
          <GroupList
            sortColumnsByBox={this.sortColumnsByBox}
            groups={board.groups}
            board={board}
          />
        ) : (
          <DoughnutChart board={board} />
        )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard,
    filterByText: state.userBoards.filterByText,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
