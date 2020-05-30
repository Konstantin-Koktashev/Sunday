import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBoards, saveBoard } from "../actions/BoardActions";
import { setChatType, loadUsers } from "../actions/UserActions";
import moment from "moment";
import "../style/cmps/userList.css";
import { NavLink } from "react-router-dom";
import { setCurrChatRoom, loadRooms } from "../actions/ChatActions";
import FilterByText from "../cmps/Filters/FilterByText";
import ChatService from "../services/ChatService";
import chat from "../style/img/chat.png";

class UserList extends Component {
  state = {
    text: "",
  };

  setUserFilter = (value) => {
    this.setState({ text: value });
  };

  UserFilter = () => {
    let value = this.state.text;
    let filteredUsers = this.props.users.filter((user) => {
      let name = user.username.toLowerCase();

      if (name.includes(value.toLowerCase())) return true;
    });
    return filteredUsers;
  };
  setPrivateChat = async (myId, toUserId) => {
    let chatWith = {
      id: { myId, toUserId },
      type: "private",
    };

    await this.props.loadRooms();
    let allMsgs = this.props.chat.chatRooms;
    let room = ChatService.getRoomById(chatWith, allMsgs);
    await this.props.setCurrChatRoom(room);
    await this.props.setChatType(chatWith);
  };
  addUserToBoard = async (user) => {
    const board = this.props.currBoard;
    board.users.push(user);
    await this.props.saveBoard(board);
    this.props.loadBoards();
  };

  toggle = () => {
    this.props.toggleAddUserToBoard();
    this.props.toggleMoreOptions();
  };

  render() {
    return (
      <div className="user-list-container flex col  ">
        <div onClick={this.toggle} className="back-screen-userlist"></div>
        <div className="user-list-topbar flex col a-center j-center">
          <h2>Search Users</h2>

          <FilterByText
            setUserFilter={this.setUserFilter}
            users={this.props.users}
          />
        </div>
        <div id="style-5" className="user-list-preview-container">
          {this.UserFilter().map((user, idx) => {
            return (
              <div className="user-search-bar flex a-center space-between">
                <NavLink className=" flex" to={`/profile/${user._id}`}>
                  <div
                    className="user-preview-circle-column"
                    title={`${user.username} Last seen at ${moment(
                      user.lastSeen
                    ).fromNow()}`}
                    key={idx}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <p>{user.username}</p>
                  <span>Seen {moment(user.lastSeen).fromNow()}</span>
                </NavLink>
                <div className="flex a-center">
                  <div className="task-bar-icon">
                    <img
                      onClick={() =>
                        this.setPrivateChat(
                          this.props.loggedInUser._id,
                          user._id
                        )
                      }
                      src={chat}
                      alt="Chat"
                      title="Click to Chat"
                    />
                  </div>
                  <button
                    title={`Add to ${this.props.currBoard.name}`}
                    className="add-to-board-btn"
                    onClick={(user) => this.addUserToBoard(user)}
                  >
                    Add to Board
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  loggedInUser: state.user.loggedInUser,
  chat: state.chat,
  currBoard: state.userBoards.currBoard,
});

const mapDispatchToProps = {
  loadBoards,
  loadUsers,
  setChatType,
  setCurrChatRoom,
  loadRooms,
  saveBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
