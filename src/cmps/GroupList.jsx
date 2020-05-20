import React from "react";

import TaskList from "./TaskList.jsx";
export default function GroupList(props) {
  return (
    <div className="toy-list-container scrollbar" id="style-5">
      <div className="toy-list flex wrap j-center color-change-2x">
        {props.toys && !props.toys.length > 0 ? (
          <div className="group-list-container">
            <h3>No Groups Found!</h3>
          </div>
        ) : (
          props.toys.map((toy) => (
            <TaskList
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
