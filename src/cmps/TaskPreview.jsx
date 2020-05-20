import React from "react";
import "../style/cmps/taskPreview.css";
import person from "../style/img/person.svg";
export function TaskPreview(props) {
  const { task } = props;
  return (
    <div className="task-bar flex j-start space-between">
      <h2>{task.taskTitle}</h2>
      <div className="task-bar-columns-container flex space-evenly a-center">
        <p>{task.createdAt}</p>
        <div>
          <img src={person} />
        </div>
        <p>{task.status}</p>
        <p>{task.budget}</p>
        <p>{task.text}</p>
        <p>{task.DueDate}</p>
        <p>{task.priority}</p>
      </div>
    </div>
  );
}
