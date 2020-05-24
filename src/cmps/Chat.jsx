import React, { Component } from "react";
import localBoardService from "../services/localBoardService";
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
} from "../actions/boardActions";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      //   loggedInUser: this.props.user,
      chatWith: null,
    };
  }

  componentDidMount = async () => {
    await this.props.loadUsers();
    // SocketService.setup();
    // let userId = this.props.user._id;
    // SocketService.emit(`openChat`, userId);
    this.openBoardChat();
    SocketService.on(`openBoardChat`, (data) => {
      let msg = `${data.msgData.author} \n\n ${data.msgData.text}`;
      console.log(" HERE GOT MSG", msg);
      this._onMessageWasSent(msg);
    });
  };

  openBoardChat = () => {
    let data = {
      boardChatId: this.props.board._id,
    };
    SocketService.emit(`openBoardChat`, data);
  };

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  _sendMessage(text) {
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

      let msgData = {
        author: `${this.props.user.username}`,
        type: "text",
        data: { text },
      };
      console.log(" HERE GOT MSG");
      let data = {
        msgData,
      };
      SocketService.emit(`openBoardChat`, data);
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
          onFilesSelected={this._onFilesSelected.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
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
