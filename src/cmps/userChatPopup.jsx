import React, { Component } from "react";
import localBoardService from "../services/localBoardService";
import { connect } from "react-redux";
import "../style/cmps/chatPopup.css";
import { saveBoard, loadBoards, setCurrBoard } from "../actions/boardActions";

class userChatPopup extends Component {
  state = {};

  makeRight = (idx) => {
    let right = idx * 3 + 15;
    return right;
  };
  /// needs to get a user Obj
  render() {
    const { user } = this.props;
    return (
      <div
        style={{ right: `${this.makeRight(this.props.idx)}vw` }}
        className="user-chat-popup-card"
      >
        <h2>IM A USER</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(userChatPopup);
