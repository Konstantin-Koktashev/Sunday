import React from "react";
import { TaskPreview } from "./TaskPreview.jsx";
export function TaskList(props) {
  return (
    <div className="toy-list-container scrollbar" id="style-5">
      <div className="toy-list flex wrap j-center color-change-2x">
        {props.tasks && !props.tasks.length > 0 ? (
          <div className="task-list-container">
            <h3>No Tasks Found!</h3>
          </div>
        ) : (
          props.tasks.map((task, idx) => <TaskPreview task={task} key={idx} />)
        )}
      </div>
    </div>
  );
}
