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
import { loadUsers } from "../../actions/UserActions";
import UserChatPopup from "./UserChatPopup";
class UserChatList extends Component {
  state = {
    chats: null,
  };
  async componentDidMount() {
    await this.props.loadUsers();
    await this.props.loadRooms();
    let chatObjects = this.props.chat.chatRooms
      ? this.props.chat.chatRooms
      : [];
  }

  filterChatsByUser = () => {
    const { chatRooms } = this.props.chat;
    console.log("UserChatList -> filterChatsByUser -> chatRooms", chatRooms);
    const user = this.props.user;
    if (!chatRooms) return;
    chatRooms.filter((room) => {
      console.log("UserChatList -> filterChatsByUser -> room", room);
      if (room) {
        if (room.userA === user._id || room.userA === user._id) return true;
      }
    });
    return chatRooms;
  };
  /// needs to get a Open Chat Array Obj
  render() {
    let chatRooms = this.filterChatsByUser();
    console.log("UserChatList -> render -> chatRooms", chatRooms);
    return (
      <>
        {chatRooms && chatRooms.length > 0 && (
          <div className="user-chat-popup-container">
            {chatRooms.map((chatRoom, idx) => {
              console.log("UserChatList -> render -> chatRoom", chatRoom);
              if (idx > 5) return;
              return (
                <UserChatPopup
                  key={idx}
                  idx={idx}
                  chatRoom={chatRoom}
                  users={this.props.users}
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
  user: state.user.loggedInUser,
  users: state.users,
});

const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  setCurrBoard,
  loadRooms,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatList);
