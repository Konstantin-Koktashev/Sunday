import React, { Component } from "react";
import "../style/cmps/taskList.css";
import { TaskPreview } from "./TaskPreview.jsx";
import resize from "../style/img/resize.png";
export default class TaskList extends Component {
  state = {
    taskIsShown: true,
  };
  toggleList = () => {
    if (this.state.taskIsShown) {
      this.setState({ taskIsShown: false });
    } else {
      this.setState({ taskIsShown: true });
    }
  };
  render() {
    return (
      <div className="task-list-container flex col space-evenly">
        {this.props.tasks && !this.props.tasks.length > 0 ? (
          <h3>No Tasks Found!</h3>
        ) : (
          <div className="task-list-card">
            <img
              className="resize-png"
              onClick={this.toggleList}
              src={resize}
              alt="here"
            />
            <h2>Group Name{this.props.name}</h2>

            <div
              className={`task-list flex col ${
                this.state.taskIsShown ? "" : "hide"
              }`}
            >
              {this.props.tasks.map((task, idx) => (
                <TaskPreview task={task} key={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
