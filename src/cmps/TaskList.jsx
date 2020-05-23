import React, { Component } from "react";
import "../style/cmps/taskList.css";
import { TaskPreview } from "./TaskPreview.jsx";
import resize from "../style/img/resize.png";
import pencil from "../style/img/pencil.svg";
import { TaskBoxList } from "./TaskBoxList.jsx";
import AddTask from "../../src/cmps/AddTask";
import localBoardService from "../services/localBoardService";
import { connect } from "react-redux";
import {
  saveBoard,
  loadBoards,
  removeBoard,
  setCurrBoard,
} from "../actions/boardActions";
class TaskList extends Component {
  state = {
    taskIsShown: true,
    groupName: this.props.name,
    groupNameIsEdit: false,
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
    let newBoard = localBoardService.removeTask(board, group, task);
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ groupName: value });
  };

  updateGroupName = (ev) => {
    ev.preventDefault();
    let { board, group, loadBoards, saveBoard } = this.props;
    localBoardService.changeGroupName(board, group, this.state.groupName);
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

  updateBoardColOrder = (board) => {
    this.props.saveBoard(board);
    this.props.loadBoards();
    this.props.setCurrBoard();
  };

  render() {
    return (
      <div className="task-list-container flex col space-evenly">
        {this.props.tasks && !this.props.tasks.length > 0 ? (
          <h3>No Tasks Found!</h3>
        ) : (
          <div className="task-list-card ">
            <div className="flex a-center space-between">
              <div className="flex a-center">
                <img
                  className="resize-png"
                  onClick={this.toggleList}
                  src={resize}
                  alt="Resize"
                  title="Toggle Group"
                />
                {!this.state.groupNameIsEdit ? (
                  <h2 onClick={(ev) => this.toggleEdit(ev)}>
                    {this.props.name}
                    <img
                      className="pencil-svg"
                      onClick={(ev) => this.toggleEdit(ev)}
                      src={pencil}
                      alt="Edit"
                      title="Edit"
                    />
                  </h2>
                ) : (
                  <form>
                    <input
                      type="text"
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.handleChange}
                      onBlur={(ev) => this.updateGroupName(ev)}
                    />
                  </form>
                )}
              </div>
              <TaskBoxList
                updateBoardColOrder={this.updateBoardColOrder}
                items={this.props.cols}
                board={this.props.board}
              ></TaskBoxList>
            </div>
            <div
              className={`task-list flex col ${
                this.state.taskIsShown ? "" : "hide"
              }`}
            >
              {this.props.tasks.map((task, idx) => (
                <TaskPreview
                  deleteTask={this.deleteTask}
                  task={task}
                  key={idx}
                  board={this.props.board}
                />
              ))}
              <AddTask group={this.props.group}></AddTask>
            </div>
          </div>
        )}
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
