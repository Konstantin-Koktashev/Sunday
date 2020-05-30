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
import ChartDetails from "../Statistics/ChartDetails";

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
        view = (
          <div className="chart-container">
            <ChartDetails board={this.props.currBoard} />
            <RadarChart board={this.props.currBoard} />
          </div>
        );
        break;
      case "pie":
        view = (
          <div className="chart-container">
            <ChartDetails board={this.props.currBoard} />
            <DoughnutChart board={this.props.currBoard} />
          </div>
        );
        break;
      default:
        view = (
          <GroupList
            swapTaskFromGroup={this.swapTaskFromGroup}
            sortColumnsByBox={this.sortColumnsByBox}
            groups={this.props.currBoard.groups}
            board={this.props.currBoard}
          />
        );
    }
    return view;
  };

  swapTaskFromGroup = async (board, groupToRemoveFrom, groupToAdd, taskStr) => {
    let task = JSON.parse(taskStr);

    // let newBoard = LocalBoardService.removeTaskFromGroup(
    //   board,
    //   groupToRemoveFrom,
    //   task
    // );

    let newBoardAfterAdd = LocalBoardService.addTaskToGroup(
      board,
      groupToAdd,
      task
    );

    this.props.setCurrBoard(newBoardAfterAdd);
    await this.props.saveBoard(newBoardAfterAdd);
    this.props.loadBoards();
  };

  addTaskToGroup = async (board, group, task) => {
    let newBoard = LocalBoardService.addTaskToGroup(board, group, task);
    await this.props.saveBoard(newBoard);
    this.props.setCurrBoard(newBoard);
    this.props.loadBoards();
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
