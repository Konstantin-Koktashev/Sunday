import React from "react";
import GroupList from "./GroupList.jsx";
export default function Board(props) {
  const board = props.board;
  return (
    <div>
      {/* <h3>Board name:{board.name}</h3>
      <h3>Board name:{board._id}</h3> */}

      <GroupList groups={board.groups} />
    </div>
  );
}
