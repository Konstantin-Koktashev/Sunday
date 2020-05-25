import React, { Component } from "react";
import LocalBoardService from "../../services/LocalBoardService";
import { connect } from "react-redux";
import "../style/cmps/chatPopup.css";
import { saveBoard, loadBoards, setCurrBoard } from "../../actions/BoardActions";
import UserChatPopup from "./UserChatPopup";
class UserChatList extends Component {
  /// needs to get a Open Chat Array Obj
  render() {
    const { chatObjects } = this.props;
    return (
      <div className="user-chat-popup-container">
        {chatObjects.map((user, idx) => {
          return <UserChatPopup idx={idx} user={user}></UserChatPopup>;
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

export default connect(mapStateToProps, mapDispatchToProps)(UserChatList);
