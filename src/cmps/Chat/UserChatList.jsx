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
  sortByKey = (array, key) => {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };
  filterChatsByUser = () => {
    const { chatRooms } = this.props.chat;
    const user = this.props.user;
    if (!chatRooms) return;
    chatRooms.filter((room) => {
      if (room) {
        if (room.userA === user._id || room.userB === user._id) return true;
      }
    });

    let sortedRooms = this.sortByKey(chatRooms, "lastUpdate");
    return sortedRooms;
  };
  /// needs to get a Open Chat Array Obj
  render() {
    let chatRooms = this.filterChatsByUser();
    return (
      <>
        {chatRooms && chatRooms.length > 0 && (
          <div className="user-chat-popup-container">
            {chatRooms.map((chatRoom, idx) => {
              if (idx > 5) return;
              return (
                <UserChatPopup
                  history={this.props.history}
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
