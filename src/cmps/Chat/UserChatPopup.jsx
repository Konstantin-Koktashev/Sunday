import React, { Component } from "react";
import { connect } from "react-redux";
import "../../style/cmps/chatPopup.css";
import { setChatType } from "../../actions/UserActions";
import SmallImg from "../../cmps/SmallImg";
import ChatService from "../../services/ChatService";
import LocalBoardService from "../../services/LocalBoardService";
import { loadBoards } from "../../actions/BoardActions";
import UserService from "../../services/UserService";
class UserChatPopup extends Component {
  state = {};

  makeRight = (idx) => {
    let right = idx * 6 + 12;
    return right;
  };

  setPrivateChat = async (myId, toUserId) => {
    let chatWith = {
      id: { myId, toUserId },
      type: "private",
    };
    await this.props.setChatType(chatWith);
  };

  getToUserId = () => {
    if (!this.props.user) return;
    let myUser = this.props.user;
    console.log("UserChatPopup -> getToUserId -> myUser", myUser);
    const { chatRoom } = this.props;
    console.log("UserChatPopup -> getToUserId -> chatRoom ", chatRoom);
    if ((chatRoom && !chatRoom.userA) || (myUser && !myUser._id)) return;
    if (chatRoom.userA === myUser._id) {
      return chatRoom.userB;
    } else {
      return chatRoom.userA;
    }
  };

  getUserById = async (toUserId) => {
    // await this.props.loadBoards();
    let user = await UserService.getById(toUserId);
    let boards = this.props.boards;
    if (!user) user = LocalBoardService.getById(boards, toUserId);
    return user;
  };
  /// needs to get a user Obj
  render() {
    const { chatRoom } = this.props;
    const toUserId = this.getToUserId();
    const user = this.getUserById(toUserId);
    return (
      <div
        onClick={() => this.setPrivateChat(this.props.user._id, toUserId)}
        style={{ right: `${this.makeRight(this.props.idx)}vw` }}
        className="user-chat-popup-card slide-in-right"
      >
        {user && user.imgUrl ? (
          <SmallImg
            zindex={this.props.idx}
            url={user.imgUrl}
            name={user.username}
            key={this.props.idx}
          />
        ) : (
          <h2>{user && user.name && user.name.charAt().toUpperCare()}</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.loggedInUser,
  chat: state.chat,
  boards: state.userBoards.board,
});

const mapDispatchToProps = {
  setChatType,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatPopup);
