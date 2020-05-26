import React, { Component } from "react";
import { connect } from "react-redux";
import "../../style/cmps/chatPopup.css";
import { setChatType } from "../../actions/UserActions";

class UserChatPopup extends Component {
  state = {};

  makeRight = (idx) => {
    let right = idx * 6 + 4;
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

  /// needs to get a user Obj
  render() {
    const { chatRoom } = this.props;
    const toUserId = this.getToUserId();
    return (
      <div
        onClick={() => this.setPrivateChat(this.props.user._id, toUserId)}
        style={{ right: `${this.makeRight(this.props.idx)}vw` }}
        className="user-chat-popup-card"
      >
        <h2>IM A USER</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.loggedInUser,
  chat: state.chat,
});

const mapDispatchToProps = {
  setChatType,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatPopup);
