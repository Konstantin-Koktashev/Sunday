import React from "react";
import { Link } from "react-router-dom";
export default function BoardNav(props) {
  return (
    <div className="toy-list-container scrollbar" id="style-5">
      <div className="toy-list flex wrap j-center color-change-2x">
        {props.toys && !props.toys.length > 0 ? (
          <div className="board-nav-container">
            <h3>Your Boards</h3>
          </div>
        ) : (
          props.boards.map((board, idx) => (
            <Link key={idx} to={`/board/${board._id}`}>
              {board.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
