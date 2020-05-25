import React, { Component } from "react";
import LocalBoardService from "../services/LocalBoardService";
import { connect } from "react-redux";
import "../style/cmps/chatPopup.css";
import { saveBoard, loadBoards, setCurrBoard } from "../actions/BoardActions";

class UserChatPopup extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserChatPopup);
