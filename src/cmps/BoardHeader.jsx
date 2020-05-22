import React from "react";
import "../style/cmps/boardHeader.css";
import AddGroup from "./AddGroup";
export default function BoardHeader(props) {
  const board = props.board;
  return (
    <div className="board-header-container flex a-center space-between">
      <h2>{board.name}</h2>
      <div className="flex space-between">
        <AddGroup board={props.board}></AddGroup>
        <button onClick={() => props.removeBoard(board._id)}>
          Remove board
        </button>
      </div>
    </div>
  );
}
