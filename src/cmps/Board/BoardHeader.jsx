import React from "react";
import "../../style/cmps/boardHeader.css";
import AddGroup from "../Groups/AddGroup";
import FilterByText from "../Filters/FilterByText.jsx";
import Swal from 'sweetalert2'

export default function BoardHeader(props) {
  const confirmDelete= (boardId)=> Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    

  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your Project has been deleted.',
        'success'
      )
      props.removeBoard(board._id)
      
    }
  })
  const board = props.board;
  return (
    <div className="board-header-container flex a-center space-between">
      <h2>{board.name}</h2>

      <button className="toggle-chart-btn" onClick={props.toggleChart}>
        {props.chartIsOpen ? "Board View" : "Chart View"}
      </button>
      <div className="flex col space-between">
        <div className="flex space-between">
          <AddGroup board={props.board}></AddGroup>
          <button
            className="header-remove-board"
            // onClick={() => props.removeBoard(board._id)}
            onClick={() =>confirmDelete(board._id)}
          >
            Remove board
          </button>
        </div>

        <FilterByText currBoard={props.board} />
      </div>
    </div>
  );
}
