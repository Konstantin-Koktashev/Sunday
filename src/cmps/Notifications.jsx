import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/cmps/notifications.css";
import { loadUsers } from "../actions/UserActions";
import moment from "moment";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/BoardActions";
import SmallImg from "../cmps/SmallImg";
import { NavLink } from "react-router-dom";
class Notifications extends Component {
  state = {
    notifications: null,
  };
  componentDidMount() {
    let notifications = this.checkUserHistory();
    this.setState({ notifications });
  }
  checkUserHistory = () => {
    //   await  this.props.loadBoards()
    const boards = this.props.boards;
    if (!this.props.user) return;
    const currUserId = this.props.user._id;
    let totalUserHistory = [];
    boards.forEach((board) => {
      board.history.forEach((update) => {
        totalUserHistory.push(update);
      });
    });
    return totalUserHistory;
  };

  //   assignedBy: "5ec6d5685532a82028c9d025"
  // boardId: "5ecebaa1531dc23e549dfc96"
  // boardName: "HEY"
  // group: false
  // messeges: []
  // nextColor: "#44bd32"
  // nextValue: "Done"
  // prevValue: "Labels"
  // seenBy: []
  // taskId: "7021042f-8a15-42eb-b101-fbb48d08477c"
  // timeStamp: 1590607220320
  // title: "Task - Write you task here"
  // updateType: "Label Change"
  // user: {_id: "5ec6d5685532a82028c9d025", isAdmin: true, email: "pakakaw41@gmail.com", username: "abir", givenReviews: Array(0), …}
  // _id: "ed4392f7-c490-47ad-80a9-81618
  getUpdateText(update) {
    let { updateType, prevValue, nextValue } = update;
    console.log("Notifications -> getUpdateText -> updateType", updateType);
    let text;
    switch (updateType) {
      case "New Group":
        text = `Has Created a new Group: ${nextValue}`;
        break;
      case "Label Change":
        text = `Has changed a label from ${prevValue} to ${nextValue}`;
        break;
      default:
    }
    console.log("Notifications -> getUpdateText ->  text", text);

    return text;
  }

  render() {
    const { notifications } = this.state;
    return (
      <>
        <div className="notifications-container">
          <div>
            <div
              className="close-notifications"
              onClick={this.props.toggleNotifications}
            >
              Exit
            </div>
            <h2>Notifications</h2>
            <div className="">
              {notifications &&
                notifications.map((update, idx) => {
                  console.log("Notifications -> render -> update", update);
                  return (
                    <div key={idx} className="update-card flex a-center col">
                      <div className="notification-user-box flex a-center">
                        <SmallImg
                          url={update.user.imgUrl}
                          name={update.user.username}
                        />
                        <NavLink to={`/profile/${update.user._id}`}>
                          {update.user.username}
                        </NavLink>
                        <p className="update-card-action">
                          {this.getUpdateText(update)}
                        </p>
                      </div>
                      <div className="notification-update-info flex a-center">
                        <p className="update-card-time">
                          {moment(update.timeStamp).fromNow()}
                        </p>
                      </div>
                      {/* <p>{update.prevValue ? update.prevValue : ""}</p>
                <p>{update.nextValue ? update.nextValue : ""}</p> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
