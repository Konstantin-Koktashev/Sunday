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
    SocketService.emit('boardChat' , this.props.board._id)
    await this.props.loadUsers();
    
    // SocketService.setup();
    // let userId = this.props.user._id;
    // SocketService.emit(`openChat`, userId);
    // this.openBoardChat();
    // SocketService.on(`openBoardChat`, (msgData) => {
    //   let msg = `${msgData.author} \n\n ${msgData.text}`;
    //   console.log(" HERE GOT MSG");
    //   this._onMessageWasSent(msg);
    // });

    // let msgToShow = `${msg.author} \n\n ${msg.text}`;
    // this._onMessageWasSent(msg)
    SocketService.on('sendMsg', msg => {
      console.log('heagati lepo')
      this.setState({
        messageList: [...this.state.messageList, msg],
      });

    })
  };

  // openBoardChat = () => {
  //   SocketService.emit(`openBoardChat`, this.props.board._id);
  // };

  //   componentWillUnmount() {
  //     // SocketService.off("doRefresh", (data) => {
  //     //   _onMessageWasSent(message);
  //     // });
  //   }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
    console.log('send msg')
    SocketService.emit(`sendMsg`, message);
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
