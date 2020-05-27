import React, { Component } from "react";

import Updates from "../Updates";
import InfoBoxes from "../InfoBoxes.jsx";
import ActivityLog from "../ActivityLog";

export default class TaskDetails extends Component {
  state = {
    chosenRender: null,
  };

  setChosenOpt = (val) => {
    this.setState({ chosenRender: val });
  };
  render() {
    const { chosenRender } = this.state;
    return (
      <section className="task-details">
        {/* <h3>{task.text}</h3> */}
        <h3>HARD CODED TASK TEXT</h3>

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
          {chosenRender === "updates" && <Updates />}
          {chosenRender === "info-boxes" && <InfoBoxes />}
          {chosenRender === "activity-log" && <ActivityLog />}
        </div>
        <div className="detail-container">
          {chosenRender === "updates" && <Updates />}
          {chosenRender === "info-boxes" && <InfoBoxes />}
          {chosenRender === "activity-log" && <ActivityLog />}
        </div>
        <div className="detail-container">
          {chosenRender === "updates" && <Updates />}
          {chosenRender === "info-boxes" && <InfoBoxes />}
          {chosenRender === "activity-log" && <ActivityLog />}
        </div>
        <div className="detail-container">
          {chosenRender === "updates" && <Updates />}
          {chosenRender === "info-boxes" && <InfoBoxes />}
          {chosenRender === "activity-log" && <ActivityLog />}
        </div>
      </section>
    );
  }
}

