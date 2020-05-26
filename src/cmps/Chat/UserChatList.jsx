import React, { Component } from "react";
import LocalBoardService from "../../services/LocalBoardService";
import { connect } from "react-redux";
import "../../style/cmps/chatPopup.css";
import {
  saveBoard,
  loadBoards,
  setCurrBoard,
} from "../../actions/BoardActions";
import { loadRooms } from "../../actions/ChatActions";
import UserChatPopup from "./UserChatPopup";
class UserChatList extends Component {
  state = {
    chats: null,
  };
  async componentDidMount() {
    await this.props.loadRooms();
    let chatObjects = this.props.chat.chatRooms
      ? this.props.chat.chatRooms
      : [];
  }
  /// needs to get a Open Chat Array Obj
  render() {
    // const { chatObjects } = this.props; /// REAL ONE NEEDED
    const { chatRooms } = this.props.chat;
    return (
      <>
        {chatRooms && chatRooms.length > 0 && (
          <div className="user-chat-popup-container">
            {chatRooms.map((chatRoom, idx) => {
              return (
                <UserChatPopup
                  key={idx}
                  idx={idx}
                  chatRoom={chatRoom}
                ></UserChatPopup>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chat: state.chat,
});

const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  setCurrBoard,
  loadRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatList);
