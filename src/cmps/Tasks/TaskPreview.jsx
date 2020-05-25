import React, { Component } from "react";
import "../../style/cmps/taskPreview.css";
import chat from "../../style/img/chat.png";
import TaskBox from "../../cmps/Tasks/TaskBox";
import deletePng from "../../style/img/delete.svg";
import LocalBoardService from "../../services/LocalBoardService";
import pencil from "../../style/img/pencil.svg";
import { connect } from "react-redux";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
<<<<<<< HEAD
} from "../../actions/BoardActions";
=======
<<<<<<<< HEAD:src/cmps/Tasks/TaskPreview.jsx
} from "../../actions/BoardActions";
========
} from "../actions/BoardActions";
>>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834:src/cmps/TaskPreview.jsx
>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834
class TaskPreview extends Component {
  state = {
    taskTitle: this.props.task.taskTitle,
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
    let sortedCols = LocalBoardService.sortColumnsByBox(cols, order);
    return sortedCols;
  }

  // First Function
  matchTaskBoxToBoardColumns = () => {
    let { board, task } = this.props;
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
          let boxCopy = JSON.stringify(box);
          task.columns.push(JSON.parse(boxCopy));
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
  updateTaskName = async (ev, task) => {
    ev.preventDefault();
    let { boards, board, group, loadBoards, saveBoard } = this.props;
<<<<<<< HEAD
=======
<<<<<<<< HEAD:src/cmps/Tasks/TaskPreview.jsx
    LocalBoardService.updateTaskName(board, task, this.state.taskTitle);
    console.log('---- before: ', board.history.length, board);
    this.changeHistoryTaskNames(boards, task)
========
>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834
    if (!this.state.taskTitle) {
      this.toggleTaskEdit();
      return;
    }
<<<<<<< HEAD
    LocalBoardService.updateTaskName(board, task, this.state.taskTitle);
    console.log("---- before: ", board.history.length, board);
    this.changeHistoryTaskNames(boards, task);
=======
    localBoardService.updateTaskName(board, task, this.state.taskTitle);
    console.log("---- before: ", board.history.length, board);
    this.changeHistoryTaskNames(boards, task);
>>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834:src/cmps/TaskPreview.jsx
>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834
    await saveBoard(board);
    loadBoards();
    this.toggleTaskEdit();
    console.log("----", board.history.length, board);
  };
  changeHistoryTaskNames = (boards, task) => {
    boards.forEach((board) => {
      // debugger
      board.history.forEach((history) => {
        if (history.taskId === task._id) history.title = this.state.taskTitle;
      });
    });
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
        <div className="task-bar-title-container flex space-between a-center">
          <div className="title-box flex  a-center">
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
                  className="input-edit-taskName"
                  value={this.state.taskTitle}
                  onChange={this.handleChange}
                  onBlur={(ev) => this.updateTaskName(ev, task)}
                  placeholder="Enter a name.."
                  required
                />
              </form>
            )}
          </div>
          <div className="task-bar-icon">
            <img src={chat} alt="Chat" title="Click to Chat" />
          </div>
        </div>

        <div className="task-bar-columns-container flex space-evenly a-center">
          {/* <p>{task.createdAt}</p> */}
          {/* <div className="box-div">
          <img src={person} alt="Person" />
        </div> */}
          {this.matchTaskBoxToBoardColumns().map((col, idx) => {
            return <TaskBox key={idx} col={col} task={this.props.task} />;
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
<<<<<<< HEAD
=======
<<<<<<<< HEAD:src/cmps/Tasks/TaskPreview.jsx

// export function TaskPreview(props) {
//   let task = props.task;
//   function SortCols(board, cols) {
//     let order = [];
//     board.columns.forEach((col) => {
//       order.push(col.order);
//     });
//     console.log("SortCols -> order", order);
//     let sortedCols = LocalBoardService.sortColumnsByBox(cols, order);
//     return sortedCols;
//   }
//   // First Function
//   let SortedCols = matchTaskBoxToBoardColumns(props);
//   function matchTaskBoxToBoardColumns(props) {
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
========
>>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834:src/cmps/TaskPreview.jsx
>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834
