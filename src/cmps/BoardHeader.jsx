import React from "react";
import "../style/cmps/boardHeader.css";
export default function BoardHeader(props) {
  const board = props.board;
  return (
    <div className="board-header-container flex a-center space-between">
      <h2>Board name:{board.name}</h2>
      <h3>Board name:{board._id}</h3>
    </div>
  );
}