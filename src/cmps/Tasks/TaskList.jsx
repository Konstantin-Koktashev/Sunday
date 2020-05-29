import React, { Component } from "react";
import "../../style/cmps/taskList.css";
import TaskPreview from "./TaskPreview.jsx";
import resize from "../../style/img/resize.svg";
import pencil from "../../style/img/pencil.svg";
import { TaskBoxList } from "./TaskBoxList.jsx";
import AddTask from "./AddTask";
import LocalBoardService from "../../services/LocalBoardService";
import { connect } from "react-redux";
import ProgressBar from "../Statistics/ProgressBar";
import GenereicProgBar from "../Statistics/GenereicProgBar";

import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../../actions/BoardActions";
import SumBar from "../Statistics/SumBar";
import { CirclePicker } from "react-color";
class TaskList extends Component {
  state = {
    taskIsShown: true,
    groupName: this.props.name,
    groupNameIsEdit: false,
    groupColor: false,
  };
  toggleList = () => {
    if (this.state.taskIsShown) {
      this.setState({ taskIsShown: false });
    } else {
      this.setState({ taskIsShown: true });
    }
  };

  deleteTask = (task) => {
    console.log("TaskList -> deleteTask -> task", task);
    let group = this.props.group;
    let board = this.props.board;
    let newBoard = LocalBoardService.removeTask(board, group, task);
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  handleChange = (ev) => {
    ev.preventDefault();
    const value = ev.target.value;
    this.setState({ groupName: value });
  };

  updateGroupName = (ev) => {
    ev.preventDefault();
    let { board, group, loadBoards, saveBoard } = this.props;
    LocalBoardService.changeGroupName(board, group, this.state.groupName);
    saveBoard(board);
    loadBoards();
    this.toggleEdit();
  };

  toggleEdit = (ev) => {
    // ev.stopPropagation();
    this.setState(({ groupNameIsEdit }) => ({
      groupNameIsEdit: !groupNameIsEdit,
    }));
  };

  updateBoardColOrder = async (board) => {
    await this.props.saveBoard(board);
    await this.props.setCurrBoard(board);
    await this.props.loadBoards();
  };

  groupToggleColor = (ev) => {
    ev.preventDefault();

    ev.stopPropagation();
    this.setState(({ groupColor }) => ({
      groupColor: !groupColor,
    }));
  };

  setGroupColor = async (color, ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState(({ groupColor }) => ({
      groupColor: !groupColor,
    }));
    console.log("colorfrimpicker", color);
    let group = this.props.group;
    let board = this.props.board;
    let newBoard = LocalBoardService.changeGroupColor(board, group, color.hex);
    await this.props.setCurrBoard(newBoard);
    this.props.loadBoards();
  };

  render() {
    const { groupColor } = this.state;
    return (
      <div
        className={`   flex col ${
          this.state.taskIsShown ? "group-list" : "group-list-small"
        }`}
      >
        <div
          className={`task-list-container flex col space-evenly    flex col ${
            this.state.taskIsShown ? "" : "task-list-container-small"
          }`}
        >
          {this.props.tasks && !this.props.tasks.length > 0 ? (
            <h3>No Tasks Found!</h3>
          ) : (
            <div
              className={`task-list-card   flex col ${
                this.state.taskIsShown ? "" : "task-list-card-small"
              }`}
            >
              <div className="task-box-toplist-container flex a-center space-between">
                <div className="task-list-top flex a-center">
                  <img
                    className="resize-png"
                    onClick={this.toggleList}
                    src={resize}
                    alt="Resize"
                    title="Toggle Group"
                  />
                  {!this.state.groupNameIsEdit ? (
                    <>
                      <div
                        className="toggle-group-color"
                        title="Change group color"
                        style={{ backgroundColor: `${this.props.group.color}` }}
                        onClick={(ev) => this.groupToggleColor(ev)}
                      >
                        {groupColor && (
                          <div className="circle-group-container">
                            <CirclePicker
                              onChangeComplete={(color, ev) =>
                                this.setGroupColor(color, ev)
                              }
                            />
                          </div>
                        )}
                      </div>
                      <h2
                        onClick={(ev) => this.toggleEdit(ev)}
                        style={{ color: `${this.props.group.color}` }}
                      >
                        {this.props.name}
                        <img
                          className="pencil-svg"
                          onClick={(ev) => this.toggleEdit(ev)}
                          src={pencil}
                          alt="Edit"
                          title="Edit"
                        />
                      </h2>

                      {groupColor && (
                        <div
                          className="group-color-screen"
                          onClick={(ev) => this.groupToggleColor(ev)}
                        ></div>
                      )}
                    </>
                  ) : (
                    <>
                      <form>
                        <input
                          type="text"
                          name="groupName"
                          value={this.state.groupName}
                          onChange={(ev) => this.handleChange(ev)}
                          onBlur={(ev) => this.updateGroupName(ev)}
                        />
                      </form>
                    </>
                  )}
                </div>
                <div
                  className={`task-box-list-container  flex col ${
                    this.state.taskIsShown ? "" : "hide"
                  }`}
                >
                  <TaskBoxList
                    updateBoardColOrder={this.updateBoardColOrder}
                    items={this.props.cols}
                    board={this.props.board}
                  ></TaskBoxList>
                </div>
              </div>
              <div
                className={`task-list  flex col ${
                  this.state.taskIsShown ? "" : "hide"
                }`}
              >
                {/* // HERE Is the Task List */}
                {this.props.tasks.map((task, idx) => (
                  <TaskPreview
                    deleteTask={this.deleteTask}
                    task={task}
                    key={idx}
                    board={this.props.board}
                    toggleTaskEdit={this.toggleTaskEdit}
                    updateTaskName={this.updateTaskName}
                    handleChangeTask={this.handleChangeTask}
                    taskNameIsEdit={this.state.taskNameIsEdit}
                    group={this.props.group}
                  />
                ))}

                {/* /// Until Here           */}
                <AddTask group={this.props.group}></AddTask>
                <div className="task-bar-for-progress">
                  <div className="div40">
                    <GenereicProgBar group={this.props.group} />
                    <SumBar group={this.props.group} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <ProgressBar group={this.props.group}></ProgressBar> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    board: state.userBoards.currBoard,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
