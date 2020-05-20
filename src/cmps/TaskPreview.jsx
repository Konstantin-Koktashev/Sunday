import React from "react";
import "../style/cmps/taskPreview.css";
import person from "../style/img/person.svg";
import { TaskBox } from "../cmps/TaskBox";
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
        {task.columns.map((col) => {
          return (
            <div className="columns-row-container flex space">
              <TaskBox col={col} />
              {/* <div>{col.status}</div>
              <div>{col.budget}</div>
              <div>{col.text}</div>
              <div>{col.DueDate}</div>
              <div>{col.priority}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
