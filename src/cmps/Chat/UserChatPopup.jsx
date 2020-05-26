import React, { Component } from "react";
import { connect } from "react-redux";
import "../../style/cmps/chatPopup.css";
import { setChatType } from "../../actions/UserActions";
import SmallImg from "../../cmps/SmallImg";
import ChatService from "../../services/ChatService";
import LocalBoardService from "../../services/LocalBoardService";
import { loadBoards, setCurrBoard } from "../../actions/BoardActions";
import { setCurrChatRoom } from "../../actions/ChatActions";
import UserService from "../../services/UserService";
// import history from history
class UserChatPopup extends Component {
  state = {};

  makeRight = (idx) => {
    let right = idx * 6 + 12;
    return right;
  };

  setChat = async (chatRoom) => {
    let boards = this.props.boards;
    if (chatRoom.type === "board") {
      const newBoard = LocalBoardService.getById(boards, chatRoom.userA);
      await this.props.setCurrBoard(newBoard);
      this.props.history.push(`/board/${chatRoom.userA}`);
    }

    console.log("UserChatPopup -> setChat -> chatRoom", chatRoom);
    const myId = chatRoom.userA;
    const toUserId = chatRoom.userB;
    let chatWith = {
      id: { myId, toUserId },
      type: chatRoom.type,
    };
    await this.props.setChatType(chatWith);
    await this.props.setCurrChatRoom(chatRoom);
  };

  getToUserId = () => {
    if (!this.props.user) return;
    let myUser = this.props.user;
    const { chatRoom } = this.props;
    if (!chatRoom) return;
    if ((chatRoom && !chatRoom.userA) || (myUser && !myUser._id)) return;
    if (chatRoom.userA === myUser._id) {
      return chatRoom.userB;
    } else {
      return chatRoom.userA;
    }
  };

  getUserById = (toUserId) => {
    // await this.props.loadBoards();
    // let user = await UserService.getById(toUserId);

    let user = this.props.users.find((user) => user._id === toUserId);

    let boards = this.props.boards;
    if (!user) user = LocalBoardService.getById(boards, toUserId);

    return user;
  };

  /// needs to get a user Obj
  render() {
    const { chatRoom } = this.props;
    console.log(
      "UserChatPopup -> render -> chatRoom!@#!@#!@#!@#!@# ",
      chatRoom
    );
    const toUserId = this.getToUserId();
    if (!toUserId) return;
    const user = this.getUserById(toUserId);

    return (
      <div
        title={user.username ? user.username : user.name}
        onClick={() => this.setChat(chatRoom)}
        style={{ right: `${this.makeRight(this.props.idx)}vw` }}
        className="user-chat-popup-card slide-in-right"
      >
        <SmallImg
          zindex={this.props.idx}
          url={user.imgUrl}
          name={user}
          key={this.props.idx}
          user={user}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.loggedInUser,
  chat: state.chat,
  boards: state.userBoards.board,
  users: state.user.users,
});

const mapDispatchToProps = {
  setChatType,
  loadBoards,
  setCurrChatRoom,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatPopup);
