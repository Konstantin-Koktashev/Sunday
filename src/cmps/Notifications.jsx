import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/cmps/notifications.css";
import { loadUsers } from "../actions/UserActions";
import moment from "moment";
import SocketService from "../services/SocketService";

import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/BoardActions";
import checkbox from "../style/img/checkbox.png";

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
    SocketService.on("doRefresh", this.loadNotifications); // NEEDS WORKS
  }
  componentDidUpdate = async (prevProps) => {
    if (
      JSON.stringify(prevProps.boards) !== JSON.stringify(this.props.boards)
    ) {
      this.loadNotifications();
    }
  };
  componentWillUnmount() {
    SocketService.off("doRefresh", this.loadNotifications);
  }

  loadNotifications = () => {
    let notifications = this.checkUserHistory();
    this.setState({ notifications });
    // setTimeout(() => {
    //   let notifications = this.checkUserHistory();
    //   this.setState({ notifications });
    // }, 10);
  };

  newNotificationPopup = (num) => {
    this.setState({ newNotifications: num });
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
    // debugger;
    let newNotifNum = 0;
    let filteredBySeen = [];
    totalUserHistory.forEach((update) => {
      if (update && update.seenBy) {
        let isSeen = LocalBoardService.checkIfUpdateSeen(update, currUserId);
        if (!isSeen) {
          filteredBySeen.push(update);
          newNotifNum++;
        }
      }
    });

    this.newNotificationPopup(newNotifNum);

    filteredBySeen.sort(function compare(a, b) {
      var dateA = new Date(a.timeStamp);
      var dateB = new Date(b.timeStamp);
      return dateB - dateA;
    });
    return filteredBySeen;
  };

  getUpdateText(update) {
    let { updateType, prevValue, nextValue } = update;
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
    return text;
  }

  // SHOULD BE IN SERVICE
  async updateById(newUpdate) {
    const user = this.props.user;
    let boards = this.props.boards;
    boards.forEach((board) => {
      board.history.forEach(async (update) => {
        if (update._id === newUpdate._id) {
          update.seenBy.push(user);
          this.loadNotifications(board);
          await this.props.saveBoard(board);
          await this.props.setCurrBoard(board);
          await this.props.loadBoards();
        }
      });
    });
  }

  setUpdateAsSeen = async (update) => {
    console.log("Notifications -> setUpdateAsSeen -> update", update);
    await this.updateById(update);
  };

  render() {
    const { notifications, newNotifications } = this.state;
    return (
      <>
        {newNotifications > 0 && (
          <div className="notifications-popup-number flex j-center a-center">
            {newNotifications}
          </div>
        )}

        {this.props.notificationsIsShown && (
          <div className="notifications-container">
            <div
              className="close-notifications"
              onClick={this.props.toggleNotifications}
            ></div>
            <div>
              <h2>Notifications</h2>
              <div className="">
                {notifications &&
                  notifications.map((update, idx) => {
                    console.log("Notifications -> render -> update", update);
                    return (
                      <div key={idx} className="update-card flex  col">
                        <div className="notification-user-box flex ">
                          <div className="flex a-center">
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
                          <div>
                            <img
                              className="complete-task-notification"
                              src={checkbox}
                              onClick={() => {
                                this.setUpdateAsSeen(update);
                              }}
                            ></img>
                          </div>
                        </div>
                        <div className="notification-update-info flex ">
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
        )}
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
