import GroupList from "./GroupList.jsx";
import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard } from "../actions/boardActions";
class Board extends Component {
  sortColumnsByBox = (order) => {
    const board = this.props.board;
    let newBoard = board.groups.map((group) => {
      let res = group.tasks.map((task) => {
        let res = this.mapOrder(task.columns, order, "order");
        return res;
      });
      return res;
    });
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

        <GroupList
          sortColumnsByBox={this.sortColumnsByBox}
          groups={this.props.board.groups}
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
