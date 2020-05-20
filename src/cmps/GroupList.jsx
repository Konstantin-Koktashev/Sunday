import React from "react";
import "../style/groupList.css";
import { TaskList } from "./TaskList.jsx";
export default function GroupList(props) {
  return (
    <div className="group-list-card">
      {props.groups && !props.groups.length > 0 ? (
        <div className="group-list-container">
          <h3>No Groups Found!</h3>
        </div>
      ) : (
        props.groups.map((group, idx) => {
          return (
            <div key={idx}>
              <h2>Group name{group.name}</h2>
              <h2>Group id:{group._id}</h2>
              {<TaskList tasks={group.tasks} />}
            </div>
          );
        })
      )}
    </div>
  );
}
