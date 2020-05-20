import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/cmps/boardNav.css";
export function BoardNav(props) {
  return (
    <div className="board-nav-container flex col space-evenly">
      <h3>Your Boards</h3>
      <div className="board-list flex col space-evenly">
        {props.boards && !props.boards.length > 0 ? (
          <div className="board-nav-container">
            <h3>No Boards :('</h3>
          </div>
        ) : (
          props.boards.map((board, idx) => (
            <div className="board-list-btn">
              <Link key={idx} to={`/board/${board._id}`}>
                {board.name}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BoardNav);
