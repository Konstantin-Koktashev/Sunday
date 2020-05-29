import React, { Component } from "react";
import Inbox from '../../pages/Inbox'
import Updates from "../Updates";
import InfoBoxes from "../InfoBoxes.jsx";
import ActivityLog from "../ActivityLog";
import { loadBoards, saveBoard } from "../../actions/BoardActions";
import { connect } from "react-redux";
import TaskInbox from "./TaskInbox";

  class TaskDetails extends Component {
  state = {
    chosenRender: null,
  };

  setChosenOpt = (val) => {
    this.setState({ chosenRender: val });
  };
  render() {
    const { chosenRender } = this.state;
    const { task } = this.props;

    return (
      <section className="clickbgc-info-box">
        {/* <h3>{task.text}</h3> */}
        <h3>HARD CODED TASK TEXT</h3>
        <div onClick={() => this.props.hideInfoBox()}>XX</div>
        <div className="details-opts">
          <div
            className="opt-select"
            onClick={() => this.setChosenOpt("updates")}
          >
            Updates
          </div>
          <div
            className="opt-select"
            onClick={() => this.setChosenOpt("info-boxes")}
          >
            Info Boxes
          </div>
          <div
            className="opt-select"
            onClick={() => this.setChosenOpt("activity-log")}
          >
            Activity Log
          </div>
          {/* {task.users.map((user, idx) => <SmallImg zindex={idx} url={user.imgUrl} name={user.name} key={idx} />)} */}
        </div>

        <div className="detail-container">
          {chosenRender === "updates" &&<TaskInbox task={task}></TaskInbox>}
          {chosenRender === "info-boxes" && <InfoBoxes  task={task} hideInfoBox={this.props.hideInfoBox}/>}
          {chosenRender === "activity-log" && <ActivityLog />}
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  userBoards: state.userBoards,
  currUser: state.user.loggedInUser,
  currBoard: state.userBoards.currBoard,
});

const mapDispatchToProps = {
  loadBoards,
  saveBoard,
};


export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);

