import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/cmps/notifications.css";
import { loadUsers } from "../actions/UserActions";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/BoardActions";
class Notifications extends Component {
  state = {
    notifications: null,
  };
  componentDidMount() {
    let notifications = this.checkUserHistory();
    this.setState({ notifications });
  }
<<<<<<< HEAD
=======
    
>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834
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
  render() {
    const { notifications } = this.state;
    return (
      <>
        <div className="notifications-container">
          <div
            className="close-notifications"
            onClick={this.props.toggleNotifications}
          >
            Exit
          </div>
          <h2>Notifications</h2>
          <div className="scrollbar scroll-container" id="style-5">
            {notifications &&
              notifications.map((update, idx) => {
                return (
                  <div key={idx} className="update-card">
                    <h3>{update.updateType ? update.updateType : ""}</h3>
                    <p>{update.taskTitle ? update.taskTitle : ""}</p>
                    <p>{update.timeStamp ? update.timeStamp : ""}</p>
                    {/* <p>{update.prevValue ? update.prevValue : ""}</p>
                <p>{update.nextValue ? update.nextValue : ""}</p> */}
                  </div>
                );
              })}
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
