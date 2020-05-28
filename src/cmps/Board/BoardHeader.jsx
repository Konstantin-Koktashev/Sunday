import React from "react";
import "../../style/cmps/boardHeader.css";
import AddGroup from "../Groups/AddGroup";
import FilterByText from "../Filters/FilterByText.jsx";
import Swal from "sweetalert2";
import ConfirmDialog from "../Board/ConfirmDialog";

export default function BoardHeader(props) {
  const confirmDelete = () => {
    let boardId = props.board._id;
    props.removeBoard(boardId);
  };
  const board = props.board;
  return (
    <div className="board-header-container flex a-center space-between">
      <h2>{board.name}</h2>
      {/* <h2> {props.user.username}</h2> */}

      <button className="toggle-chart-btn" onClick={props.toggleChart}>
        {props.chartIsOpen ? "Board View" : "Chart View"}
      </button>
      <div className="flex col space-between">
        <div className="flex space-between">
          <AddGroup board={props.board}></AddGroup>

          <ConfirmDialog remove={confirmDelete} />
        </div>

        <FilterByText currBoard={props.board} />
      </div>
    </div>
  );
}
