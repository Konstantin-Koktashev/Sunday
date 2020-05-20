import React from "react";
import TaskPreview from "./TaskPreview.jsx";
export default function TaskList(props) {
  return (
    <div className="toy-list-container scrollbar" id="style-5">
      <div className="toy-list flex wrap j-center color-change-2x">
        {props.toys && !props.toys.length > 0 ? (
          <div className="task-list-container">
            <h3>No Tasks Found!</h3>
          </div>
        ) : (
          props.toys.map((toy) => (
            <TaskPreview
              onDeleteToy={props.onDeleteToy}
              onSelectToy={props.onSelectToy}
              key={toy._id * Math.random()}
              toy={toy}
            />
          ))
        )}
      </div>
    </div>
  );
}
