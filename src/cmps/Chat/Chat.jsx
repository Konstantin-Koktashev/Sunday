import React, { Component } from "react";
import { connect } from "react-redux";
import { Launcher } from "react-chat-window";
import "../../style/cmps/chat.css";
import SocketService from "../../services/SocketService";
import UserService from "../../services/UserService";
import { loadUsers } from "../../actions/UserActions";
import {
  saveRoom,
  setCurrChatRoom,
  loadRooms,
} from "../../actions/ChatActions";

import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../../actions/BoardActions";
import ChatService from "../../services/ChatService";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      newMessagesCount: 0,
      chatRoom: null,
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

    /// Update data Messegae
  };
  startChat = async () => {
    if (!this.props.userState.chatWith) return;
    // Get The room By Id// will return null if it didnt found
    await this.props.loadRooms();
    let room = ChatService.getRoomById(
      this.props.userState.chatWith,
      this.props.chat.chatRooms
    );
    // Theres no Room ? Create one
    // debugger;
    const { id, type } = this.props.userState.chatWith;
    if (!room) {
      console.log("Creating Chat Room");
      let chatRoom = {
        chatRoomId: ChatService.getRoomKey(this.props.userState.chatWith), //Sort function
        roomHistory: this.state.messageList,
        userA: id.myId,
        userB: id.toUserId,
      };
      // Send to server
      this.props.saveRoom(chatRoom);

      this.setState({ chatRoom });
    } else {
      // Else Take the room History And render on chat
      await this.props.setCurrChatRoom(room);
      console.log("Chat -> startChat -> room", room);
      console.log(
        "@@@@@@@@@@2Chat -> startChat ->  currChatRoom",
        this.props.currChatRoom
      );
      this.setState({
        messageList: this.props.currChatRoom.roomHistory,
        chatRoom: this.props.currChatRoom,
      });
    }

    if (type === "private") {
      SocketService.emit("join_private_room", this.props.userState.chatWith);
      SocketService.on("private_room_new_msg", this.renderMessage);
    } else {
      SocketService.emit("join_board_room", id);
      SocketService.on("board_room_new_msg", this.renderMessage);
    }
  };

  //Sending message
  _onMessageWasSent = async (message) => {
    console.log("send msg : ", message);
    this.setState({
      messageList: [...this.state.messageList, message],
    });

    let { type, id } = this.props.userState.chatWith;
    let chatWith = this.props.userState.chatWith;
    chatWith.msg = message;
    if (type === "private") {
      SocketService.emit("private_room_new_msg", chatWith);
    } else {
      SocketService.emit("board_room_new_msg", chatWith);
    }

    let chatRoom = this.state.chatRoom;
    // console.log(
    //   "Chat -> _onMessageWasSent -> this.state.messageList",
    //   this.state.messageList
    // );

    chatRoom.roomHistory.push(message);
    await this.props.saveRoom(chatRoom);
    await this.props.setCurrChatRoom(chatRoom);
  };

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

  _handleClick() {
    this.setState({
      newMessagesCount: 0,
    });
  }

  getUser = (chatWith) => {
    if (!chatWith) return;
    const { board } = this.props;
    if (chatWith.type === "board") {
      return board.name;
    } else {
      let users = this.props.users;
      let user = users.find((user) => user._id === chatWith.id.toUserId);
      return user;
    }
  };

  render() {
    const { chatWith } = this.props.userState;
    const { board } = this.props;
    let user = this.getUser(chatWith);
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: `${user && user.username}`,
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
          // mute={false}
          // newMessagesCount={this.state.newMessagesCount}
          // handleClick={this._handleClick.bind(this)}
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
    users: state.user.users,
    chat: state.chat,
    currChatRoom: state.chat.currChatRoom,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  loadBoards,
  setCurrBoard,
  loadUsers,
  saveRoom,
  setCurrChatRoom,
  loadRooms,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
