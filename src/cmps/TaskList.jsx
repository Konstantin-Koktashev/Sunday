import React, { Component } from "react";
import "../style/cmps/taskList.css";
import { TaskPreview } from "./TaskPreview.jsx";
import resize from "../style/img/resize.png";
import { TaskBoxList } from "./TaskBoxList.jsx";
import AddTask from "../../src/cmps/AddTask";
import localBoardService from "../services/localBoardService";
import { connect } from "react-redux";
import { saveBoard, loadBoards, removeBoard } from "../actions/boardActions";
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
                  alt="here"
                  title="Toggle Group"
                />
                {!this.state.groupNameIsEdit ? (
                  <h2 onClick={(ev) => this.toggleEdit(ev)}>
                    {this.props.name}
                  </h2>
                ) : (
                  <form onSubmit={(ev) => this.updateGroupName(ev)}>
                    <input
                      type="text"
                      name="groupName"
                      value={this.state.groupName}
                      onChange={this.handleChange}
                    />
                    <button>Save</button>
                  </form>
                )}
              </div>
              <TaskBoxList
                sortColumnsByBox={this.props.sortColumnsByBox}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
