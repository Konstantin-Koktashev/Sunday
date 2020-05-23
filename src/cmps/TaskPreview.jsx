import React from "react";
import "../style/cmps/taskPreview.css";
import person from "../style/img/person.svg";
import chat from "../style/img/chat.png";
import TaskBox from "../cmps/TaskBox.jsx";
import deletePng from "../style/img/close.svg";
import localBoardService from "../services/localBoardService";
export function TaskPreview(props) {
  let task = props.task;

  function SortCols(board, cols) {
    let order = [];
    board.columns.forEach((col) => {
      order.push(col.order);
    });

    console.log("SortCols -> order", order);

    let sortedCols = localBoardService.sortColumnsByBox(cols, order);
    return sortedCols;
  }

  // First Function
  let SortedCols = matchTaskBoxToBoardColumns(props);
  function matchTaskBoxToBoardColumns(props) {
    // debugger;
    let board = props.board;
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

    let cols = task.columns;
    let sortedCols = SortCols(board, cols);
    sortedCols.reverse();
    return sortedCols;
  }

  return (
    <div className="task-bar flex j-start space-between">
      {/* <div className="task-color-box">0</div> */}
      <div className="title-box flex j-center a-center">
        <img
          className="delete-icon"
          src={deletePng}
          alt="Delete"
          title="Delete Task"
          onClick={() => props.deleteTask(task)}
        />

        <h2>{task.taskTitle}</h2>
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
        {SortedCols.map((col, idx) => {
          return <TaskBox key={idx} col={col} />;
        })}
      </div>
    </div>
  );
}

// matchTaskBoxToBoardColumns(props);
//   function matchTaskBoxToBoardColumns(props) {
//     // debugger;
//     let board = props.board;
//     console.log("matchTaskBoxToBoardColumns -> board ", board);
//     let boardBox = [];
//     board.columns.forEach((box) => {
//       boardBox.push(box);
//     });
//     if (board.columns.length > task.columns.length) {
//       boardBox.forEach((box) => {
//         let isFound = false;
//         for (var i = 0; i < task.columns.length; i++) {
//           console.log(
//             "matchTaskBoxToBoardColumns -> task.columns",
//             task.columns
//           );
//           if (task.columns[i].order === box.order) isFound = true;
//           console.log(
//             "box order",
//             box.order,
//             "task order",
//             task.columns[i].order
//           );
//         }
//         if (!isFound) {
//           console.log("adding", box, "with order ", box.order);
//           task.columns.push(box);
//         }
//       });
//     }
