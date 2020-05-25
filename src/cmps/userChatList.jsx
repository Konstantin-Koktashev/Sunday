import React, { Component } from "react";
import localBoardService from "../services/localBoardService";
import { connect } from "react-redux";
import "../style/cmps/chatPopup.css";
import { saveBoard, loadBoards, setCurrBoard } from "../actions/boardActions";
import userChatPopup from "../cmps/userChatPopup.jsx";
class userChatList extends Component {
  /// needs to get a Open Chat Array Obj
  render() {
    const { chatObjects } = this.props;
    return (
      <div className="user-chat-popup-container">
        {chatObjects.map((user, idx) => {
          return <userChatPopup idx={idx} user={user}></userChatPopup>;
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(userChatList);
