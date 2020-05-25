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
    let myUser = this.props.user;
    const { chatRoom } = this.props;
    if (chatRoom.userA._id === myUser._id) {
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
});

const mapDispatchToProps = {
  setChatType,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChatPopup);
