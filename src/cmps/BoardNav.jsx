import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../style/cmps/boardNav.css";
import resize from "../style/img/resize.png";
import AddBoard from "./AddBoard.jsx";

export class BoardNav extends Component {
  state = {
    boardIsShown: true,
  };
  toggleList = () => {
    if (this.state.boardIsShown) {
      this.setState({ boardIsShown: false });
    } else {
      this.setState({ boardIsShown: true });
    }
  };

  render() {
    return (
      <>
        {this.props.boards && (
          <div
            className={` ${
              this.state.boardIsShown
                ? "board-nav-container"
                : "board-nav-container-hidden"
            } flex col`}
          >
            <img
              className="resize-png-boardnav"
              onClick={this.toggleList}
              src={resize}
              alt="here"
            />
            <div className="board-nav-title flex  a-center space-between">
              <h3>Your Boards</h3>
              <AddBoard></AddBoard>
            </div>
            <div className="board-list flex col">
              {this.props.boards && !this.props.boards.length > 0 ? (
                <div className="board-nav-container">
                  <h3>No Boards :('</h3>
                </div>
              ) : (
                this.props.boards.map((board, idx) => (
                  <div key={idx} className="board-list-btn">
                    <Link to={`/board/${board._id}`}>{board.name}</Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BoardNav);
