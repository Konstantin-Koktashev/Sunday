import React, { Component } from "react";
import { connect } from "react-redux";
import { Launcher } from "react-chat-window";
import "../style/cmps/chat.css";
import SocketService from "../services/SocketService";
import { loadUsers } from "../actions/UserActions";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/BoardActions";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      //   loggedInUser: this.props.user,
      // chatWith: null,
    };
  }

  componentDidMount = async () => {
    this.startChat();
  };

  componentDidUpdate = async (prevProps) => {
    if (
      JSON.stringify(prevProps.userState.chatWith) !==
      JSON.stringify(this.props.userState.chatWith)
    ) {
      let { type } = this.props.userState.chatWith;
      // if (type === "private") {
      SocketService.off("private_room_new_msg", this.renderMessage);
      // } else {
      SocketService.off("board_room_new_msg", this.renderMessage);
      // }
      this.startChat();
    }
  };
  renderMessage = (msg) => {
    console.log("this private msg", msg);
    this.setState({
      messageList: [...this.state.messageList, msg],
    });
  };
  startChat = () => {
    if (!this.props.userState.chatWith) return;
    let { type, id } = this.props.userState.chatWith;
    console.log("Chat -> startChat -> type", type);
    if (type === "private") {
      SocketService.emit("join_private_room", this.props.userState.chatWith);
      SocketService.on("private_room_new_msg", this.renderMessage);
    } else {
      SocketService.emit("join_board_room", id);
      SocketService.on("board_room_new_msg", this.renderMessage);
    }
  };

  componentWillUnmount() {
    let { type } = this.props.userState.chatWith;
    if (type === "private") {
      SocketService.off("private_room_new_msg", this.renderMessage);
    } else {
      SocketService.off("board_room_new_msg", this.renderMessage);
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     JSON.stringify(prevProps.chatWith) !== JSON.stringify(this.state.chatWith)
  //   ) {
  //     this.setState({ chatWith: this.props.chatWith });

  //     if (this.state.chatWith) {
  //       SocketService.emit("new user", this.state.chatWith);
  //     }
  //   }
  // }
  _onMessageWasSent(message) {
    console.log("send msg : ", message);
    this.setState({
      messageList: [...this.state.messageList, message],
    });

    let { type, id } = this.props.userState.chatWith;
    let obj = this.props.userState.chatWith;
    obj.msg = message;
    console.log("Chat -> _onMessageWasSent -> type", type);
    if (type === "private") {
      SocketService.emit("private_room_new_msg", obj);
    } else {
      SocketService.emit("board_room_new_msg", obj);
    }
  }

  _sendMessage(text) {
    console.log("text send messege", text);
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: "react-chat-window",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    board: state.userBoards.currBoard,
    user: state.user.loggedInUser,
    userState: state.user,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  loadBoards,
  setCurrBoard,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
