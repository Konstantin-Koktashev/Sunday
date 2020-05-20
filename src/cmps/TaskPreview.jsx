import React from "react";
import "../style/cmps/taskPreview.css";
export function TaskPreview(props) {
  const { task } = props;
  return (
    <div className="task-bar flex j-start space-between">
      <h2>{task.taskTitle}</h2>
      <p>created : {task.createdAt}</p>
    </div>
  );
}
