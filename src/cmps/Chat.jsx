import React, { Component } from "react";
import localBoardService from "../services/localBoardService";
import { connect } from "react-redux";
import { Launcher } from "react-chat-window";

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
    };
  }

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
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
