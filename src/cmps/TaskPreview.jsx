import React from "react";
import "../style/cmps/taskPreview.css";
import person from "../style/img/person.svg";
import chat from "../style/img/chat.png";
import { TaskBox } from "../cmps/TaskBox";
export function TaskPreview(props) {
  const { task } = props;

  sortBoxs();
  function sortBoxs() {
    task.columns.sort(function (a, b) {
      return a.order - b.order;
    });
  }

  return (
    <div className="task-bar flex j-start space-between">
      {/* <div className="task-color-box">0</div> */}
      <div className="title-box flex j-center a-center">
        <h2>{task.taskTitle}</h2>
      </div>
      <img
        className="task-bar-icon"
        src={chat}
        alt="Chat"
        title="Click to Chat"
      />
      <button onClick={() => props.deleteTask(task)}></button>

      <div className="task-bar-columns-container flex space-evenly a-center">
        <p>{task.createdAt}</p>
        <div>
          <img src={person} alt="Person" />
        </div>
        {task.columns.map((col, idx) => {
          return <TaskBox key={idx} col={col} />;
        })}
      </div>
    </div>
  );
}
