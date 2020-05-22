import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard } from "../actions/boardActions";

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

    saveBoard();
  };

  render() {
    return (
      <>
        <div onClick={this.addTask}></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
  };
};
const mapDispatchToProps = {
  saveBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);