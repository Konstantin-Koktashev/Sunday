import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard } from "../actions/boardActions";
import localBoardService from "../services/localBoardService";

class AddTask extends Component {
  state = {
    task: {
      _id: 2222,
      assignedGroupId: 124,
      taskTitle: "Todo",
      createdAt: "date",
      // Aggregation
      users: [{ _id: 1234, name: "shahar" }], // Min users
      // ABIR COLS DONT TOUCH
      columns: [
        {
          type: "label",
          value: "Done",
          order: "1",
        },
        {
          type: "text",
          value: "im text",
          order: "2",
        },
        {
          type: "number",
          value: 100,
          order: "3",
        },
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
      status: "Done",
      priority: "urgent",
      DueDate: "15.02",
      budget: "150",
      text: "text about task",
      link: "",
    },
  };

  addTask = () => {
    let task = this.state.task;
    console.log('task' , task)
    let board = this.props.currBoard
    console.log('board' , board)
    let group = this.props.group
    console.log('group' , group)
    let newBoard = localBoardService.addTask(board, group, task)
    console.log('newBoard' , newBoard)
    this.props.saveBoard(newBoard);
  };

  render() {
    return (
      <>
        <div onClick={this.addTask}>add task</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
    board: state.userBoards.currBoard
  };
};
const mapDispatchToProps = {
  saveBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
