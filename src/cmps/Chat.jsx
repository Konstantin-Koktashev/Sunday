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
      // chatWith: null,
    };
  }

  componentDidMount = async () => {

   let {type, id} =  this.props.chatWith
   if (type === 'private') {
    SocketService.emit('join_private_room' , this.props.chatWith)
    SocketService.on('private_room_new_msg' , msg =>{
      console.log('this private msg' , msg)
      this.setState({
        messageList: [...this.state.messageList, msg],
      });
    })


   } else {
    SocketService.emit('join_board_room' , id)
    SocketService.on('board_room_new_msg' , msg =>{
      console.log('this board msg' , msg)
      this.setState({
        messageList: [...this.state.messageList, msg],
      });
    })
   }
  

   
    // // SocketService.emit("new user", this.props.user.username);

    // // this.setState({ chatWith: this.props.chatWith });

    // // if (this.state.chatWith) {
    // console.log(
    //   "Chat -> componentDidMount -> this.props.chatWith",
    //   this.props.chatWith
    // );
    // SocketService.emit("new user", (data) => {
    //   data.chatWith = this.props.chatWith;
    // });
    // // }

    // SocketService.on("whisper", (data) => {
    //   let msg = data.nick + "\n\n" + data.msg;
    //   console.log("Chat -> componentDidMount ->  msg", msg);

    //   this.setState({
    //     messageList: [...this.state.messageList, msg],
    //   });
    //   // _onMessageWasSent(msg);
    // });
    // SocketService.on("new", (data) => {
    //   let msg = data.nick + "\n\n" + data.msg;

    //   this.setState({
    //     messageList: [...this.state.messageList, msg],
    //   });
    //   // _onMessageWasSent(msg);
    // });

    // SocketService.on("", (msg) =>
    // SocketService.emit("boardChat", this.props.board._id);
    // await this.props.loadUsers();
    // SocketService.on("sendMsg", (msg) => {
    //   console.log("heagati lepo");
    //   this.setState({
    //     messageList: [...this.state.messageList, msg],
    //   });
    // });
  };

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

    // SocketService.emit(`sendMsg`, message);

    // author: "them",
    // type: "text",
    // data: { text },
    // emit 'board_room_new_msg', with msg

    let {type, id} =  this.props.chatWith
    if (type === 'private') {
      SocketService.emit("private_room_new_msg", message);

    } else {
      SocketService.emit("board_room_new_msg", message)
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
