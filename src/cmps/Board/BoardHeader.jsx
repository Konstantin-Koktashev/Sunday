import React from "react";
import "../../style/cmps/boardHeader.css";
import AddGroup from "../Groups/AddGroup";
import FilterByText from "../Filters/FilterByText.jsx";
import Swal from "sweetalert2";
import ConfirmDialog from "../Board/ConfirmDialog";
import SelectCmp from "../SelectCmp";
import moment from "moment";
import dots from "../../style/img/dots.png";
import UserList from "../UserList";

export default function BoardHeader(props) {
  const confirmDelete = () => {
    let boardId = props.board._id;

    props.removeBoard(boardId);
  };

  const board = props.board;
  return (
    <div className="board-header-container flex a-center space-between">
      <div className="header-box flex col ">
        <div className="flex a-center">
          <h2>{board.name} -</h2>

          <span>
            {/* {board.history[board.history.length - 1].timeStamp &&
              moment(
                board.history[board.history.length - 1].timeStamp
              ).fromNow()} */}
          </span>
        </div>
        <div className="view-select-box">
          <SelectCmp
            handleChange={props.toggleChart}
            name={"viewType"}
            label={"Select Table"}
            options={["board", "pie", "radar"]}
          />
        </div>
      </div>

      {/* <h2> {props.user.username}</h2> */}

      {/* 
      <button className="toggle-chart-btn" onClick={props.toggleChart}>
        {props.chartIsOpen ? "Board View" : "Chart View"}
      </button> */}
      <div className="flex col space-between">
        <div className="flex space-between">
          <div className="dots-board-header">
            <img
              onClick={props.toggleMoreOptions}
              title="More options"
              className="side-nav-img"
              src={dots}
              alt="More options"
            ></img>
          </div>
          {props.moreOptionsIsOpen && (
            <>
              <div
                onClick={props.toggleAddUserToBoard}
                className="back-screen-container"
              >
                {" "}
              </div>
              <div className="more-options-container flex col fade-in-editor">
                <ConfirmDialog remove={confirmDelete} />

                <div className="add-user-toboard">
                  {props.addUserToBoard && (
                    <UserList
                      toggleAddUserToBoard={props.toggleAddUserToBoard}
                    ></UserList>
                  )}
                  <div onClick={props.toggleAddUserToBoard}>
                    Invite your team
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="filter-add-container flex a-center">
          <AddGroup board={props.board}></AddGroup>

          <FilterByText currBoard={props.board} />
        </div>
      </div>
    </div>
  );
}
