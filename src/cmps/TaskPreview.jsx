import React, { Component } from "react";
import "../style/cmps/taskPreview.css";
import person from "../style/img/person.svg";
import chat from "../style/img/chat.png";
import TaskBox from "../cmps/TaskBox.jsx";
import deletePng from "../style/img/close.svg";
import localBoardService from "../services/localBoardService";
import pencil from "../style/img/pencil.svg";
import { connect } from "react-redux";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/boardActions";
class TaskPreview extends Component {
  state = {
    taskTitle: "",
    taskNameIsEdit: false,
  };
  componentDidMount() {
    // let SortedCols = matchTaskBoxToBoardColumns(props);
    // let sortedCols = this.matchTaskBoxToBoardColumns(this.props);
  }

  SortCols(board, cols) {
    let order = [];
    board.columns.forEach((col) => {
      order.push(col.order);
    });
    let sortedCols = localBoardService.sortColumnsByBox(cols, order);
    return sortedCols;
  }

  // First Function
  matchTaskBoxToBoardColumns = () => {
    // debugger;
    let { board, task } = this.props;
    console.log("matchTaskBoxToBoardColumns -> board ", board);
    let boardBox = [];
    board.columns.forEach((box) => {
      boardBox.push(box);
    });
    if (board.columns.length > task.columns.length) {
      boardBox.forEach((box) => {
        let isFound = false;
        for (var i = 0; i < task.columns.length; i++) {
          if (task.columns[i].order === box.order) isFound = true;
        }
        if (!isFound) {
          console.log("adding", box, "with order ", box.order);
          task.columns.push(box);
        }
      });
    }

    let cols = this.props.task.columns;
    let sortedCols = this.SortCols(board, cols);
    sortedCols.reverse();
    return sortedCols;
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskTitle: value });
  };
  updateTaskName = (ev, task) => {
    ev.preventDefault();
    let { board, group, loadBoards, saveBoard } = this.props;
    localBoardService.updateTaskName(board, task, this.state.taskTitle);
    saveBoard(board);
    loadBoards();
    this.toggleTaskEdit();
  };
  toggleTaskEdit = (ev) => {
    // ev.stopPropagation();
    this.setState(({ taskNameIsEdit }) => ({
      taskNameIsEdit: !taskNameIsEdit,
    }));
  };

  render() {
    const { task } = this.props;
    return (
      <div className="task-bar flex j-start space-between">
        {/* <div className="task-color-box">0</div> */}
        <div className="title-box flex j-center a-center">
          <img
            className="delete-icon"
            src={deletePng}
            alt="Delete"
            title="Delete Task"
            onClick={() => this.props.deleteTask(task)}
          />
          {!this.state.taskNameIsEdit ? (
            <>
              <h2 onClick={(ev, props) => this.toggleTaskEdit(ev)}>
                {task.taskTitle}
              </h2>
              <img
                className="pencil-svg"
                onClick={(ev, props) => this.toggleTaskEdit(ev)}
                src={pencil}
                alt="Edit"
                title="Edit"
              />
            </>
          ) : (
            <form>
              <input
                type="text"
                name="taskName"
                value={this.state.taskTitle}
                onChange={this.handleChange}
                onBlur={(ev) => this.updateTaskName(ev, task)}
              />
            </form>
          )}
        </div>
        <img
          className="task-bar-icon"
          src={chat}
          alt="Chat"
          title="Click to Chat"
        />

        <div className="task-bar-columns-container flex space-evenly a-center">
          {/* <p>{task.createdAt}</p> */}
          {/* <div className="box-div">
          <img src={person} alt="Person" />
        </div> */}
          {this.matchTaskBoxToBoardColumns().map((col, idx) => {
            return <TaskBox key={idx} col={col} />;
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    board: state.userBoards.currBoard,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPreview);

// export function TaskPreview(props) {
//   let task = props.task;
//   function SortCols(board, cols) {
//     let order = [];
//     board.columns.forEach((col) => {
//       order.push(col.order);
//     });
//     console.log("SortCols -> order", order);
//     let sortedCols = localBoardService.sortColumnsByBox(cols, order);
//     return sortedCols;
//   }
//   // First Function
//   let SortedCols = matchTaskBoxToBoardColumns(props);
//   function matchTaskBoxToBoardColumns(props) {
//     // debugger;
//     let board = props.board;
//     let boardBox = [];
//     board.columns.forEach((box) => {
//       boardBox.push(box);
//     });
//     if (board.columns.length > task.columns.length) {
//       boardBox.forEach((box) => {
//         let isFound = false;
//         for (var i = 0; i < task.columns.length; i++) {
//           if (task.columns[i].order === box.order) isFound = true;
//         }
//         if (!isFound) {
//           console.log("adding", box, "with order ", box.order);
//           task.columns.push(box);
//         }
//       });
//     }
//     let cols = task.columns;
//     let sortedCols = SortCols(board, cols);
//     sortedCols.reverse();
//     return sortedCols;
//   }
