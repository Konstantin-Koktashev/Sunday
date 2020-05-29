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
import LocalBoardService from "../services/LocalBoardService";
class Notifications extends Component {
  state = {
    notifications: null,
    newNotifications: 0,
  };
  componentDidMount() {
    this.loadNotifications();
    // SocketService.on("doRefresh", this.loadNotifications); // NEEDS WORKS
  }

  componentWillUnmount() {
    // SocketService.off("doRefresh", this.loadNotifications);
  }

  loadNotifications = () => {
    setTimeout(() => {
      let notifications = this.checkUserHistory();
      this.setState({ notifications });
    }, 2000);
  };

  newNotificationPopup = (num) => {
    let newNotifNum = num + this.state.newNotifications;
    this.setState({ newNotifications: newNotifNum });
  };
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
    // Check Notification Number
    let newNotifNum = 0;
    totalUserHistory.forEach((update) => {
      if (update && update.isSeen && update.isSeen.length > 0) {
        let isSeen = LocalBoardService.checkIfUpdateSeen(update, currUserId);
        if (!isSeen) {
          newNotifNum++;
        }
      }
    });
    this.newNotificationPopup(newNotifNum);

    return totalUserHistory;
  };

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
    const { notifications, newNotifications } = this.state;
    return (
      <>
        <div
          className="close-notifications"
          onClick={this.props.toggleNotifications}
        ></div>
        <div className="notifications-popup-number flex j-center a-center">
          {newNotifications}
        </div>
        <div className="notifications-container">
          <div>
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
                        <NavLink
                          onClick={this.props.toggleNotifications}
                          to={`/profile/${update.user._id}`}
                        >
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
