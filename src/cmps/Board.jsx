import GroupList from "./GroupList.jsx";
import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard } from "../actions/boardActions";
import boardService from "../../src/actions/boardActions";
import HttpService from "../../src/services/HttpService";
import AddGroup from "./AddGroup";

class Board extends Component {
  sortColumnsByBox = (order) => {
    let board = this.props.board;

    let newGroups = board.groups.map((group) => {
      if (!group.tasks > 0) return;
      group = group.tasks.map((task) => {
        task.columns = this.mapOrder(task.columns, order, "order");
        return task;
        // console.log("Res of Map order In Group.task.map", res);
        // return res;
      });
      return group;
      // console.log("Res to In board.groups.map", res);
      // return res23;
    });
    board.groups = newGroups;
    console.log("new board is :", board);
    // HttpService.post("board", this.props.board);
    // this.boardService.saveBoard(newBoard);
  };

  mapOrder = (array, order, key) => {
    array.sort(function (a, b) {
      var A = a[key],
        B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  };
  render() {
    return (
      <>
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
  };
};
const mapDispatchToProps = {
  saveBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
