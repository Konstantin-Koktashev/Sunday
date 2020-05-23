import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard, loadBoards } from "../actions/boardActions";
import localBoardService from "../services/localBoardService";

class AddTask extends Component {
  state = {
    task: {
      _id: 1000233,
      assignedGroupId: null,
      taskTitle: "Todo",
      createdAt: "date",
      users: [{ _id: 1234, name: "shahar" }], // Min users
      columns: [
        // {
        //   type: "label",
        //   value: "Done",
        //   order: "1",
        // },
        // {
        //   type: "text",
        //   value: "im text",
        //   order: "2",
        // },
        // {
        //   type: "number",
        //   value: 100,
        //   order: "3",
        // },
      ], //  Columns Objects
      updates: [
        {
          user: {
            userName: "user1412",
            _id: "1",
          },
          lastUpdate: Date.now(),
          description: "I changed all",
          imgUrl: "",
          aboutUser: 1234,
        },
      ], // updates objects
      notes: [
        {
          name: "name",
          description: "value",
          user: {
            userName: "user1412",
            _id: "1",
          },
          lastUpdate: Date.now(),
        },
      ], // Notes objects
      people: [],
    },
    taskTitle: "",
  };

  addTask = async (ev) => {
    ev.preventDefault();
    if (!this.state.taskTitle) return;
    let task = this.state.task;
    task.taskTitle = this.state.taskTitle;

    let board = await this.props.currBoard;
    let group = this.props.group;
    let newBoard = localBoardService.addTask(board, group, task);
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ taskTitle: value });
  };

  render() {
    return (
      <>
        <form className="add-task-bar flex" onSubmit={this.addTask}>
          <input
            type="text"
            name="title"
            placeholder="Add Task"
            value={this.state.text}
            onChange={(ev) => this.handleChange(ev)}
            onBlur={this.addTask}
            required
          />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard,
  };
};
const mapDispatchToProps = {
  saveBoard,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
