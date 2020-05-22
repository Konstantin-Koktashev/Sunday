import React from "react";
import "../style/cmps/groupList.css";
import TaskList from "./TaskList.jsx";
import AddGroup from "./AddGroup";
export default function GroupList(props) {
  return (
    <div className="group-list-container">
      {props.groups && !props.groups.length > 0 ? (
        <div className="group-list-container scrollbar" id="style-5">
          <h3>No Groups Found!</h3>
        </div>
      ) : (
        props.groups.map((group, idx) => {
          return (
            <div className="group-list" key={idx}>
              {
                <TaskList
                  name={group.name}
                  tasks={group.tasks}
                  cols={group.columns}
                  sortColumnsByBox={props.sortColumnsByBox}
                />
              }
            </div>
          );
        })
      )}
      <AddGroup board={props.board}></AddGroup>
    </div>
  );
}
