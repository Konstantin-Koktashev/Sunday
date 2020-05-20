import React from "react";
import "../style/cmps/taskList.css";
import { TaskPreview } from "./TaskPreview.jsx";
export function TaskList(props) {
  return (
    <div className="task-list-container flex col space-evenly">
      {props.tasks && !props.tasks.length > 0 ? (
        <h3>No Tasks Found!</h3>
      ) : (
        <div className="task-list flex col space-evenly">
          {props.tasks.map((task, idx) => (
            <TaskPreview task={task} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
