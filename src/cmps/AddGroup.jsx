import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard } from "../actions/boardActions";
import localBoardService from "../services/localBoardService";

class AddGroup extends Component {
  state = {
    group: {
      id: 'hirbush',
      name: "",
      createdAt: "date",
      // ABIR COLS DONT TOUCH
      columns: [
        {
          type: "date",
          value: "Date",
          order: "1",
        },
        {
          type: "poeple",
          value: "poeple",
          order: "2",
        },
        {
          type: "label",
          value: "Labels",
          order: "3",
        },
        {
          type: "text",
          value: "Text",
          order: "4",
        },
        {
          type: "number",
          value: "number",
          order: "5",
        },
      ],

      tasks: [
        {
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
        {
          _id: 2222,
          taskTitle: "Todo",
          createdAt: "date",
          // Aggregation
          users: [{ _id: 1234, name: "shahar" }], // Min users
          // ABIR COLS DONT TOUCH
          columns: [
            {
              type: "label",
              value: "Done3",
              order: 3,
            },
            {
              type: "text",
              value: "im text1",
              order: 1,
            },
            {
              type: "number",
              value: 100,
              order: 2,
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
        {
          _id: 2222,
          assignedGroupId: 123,
          taskTitle: "Todo",
          createdAt: "date",
          // Aggregation
          users: [{ _id: 1234, name: "shahar" }], // Min users
          // ABIR COLS DONT TOUCH
          columns: [
            {
              type: "label",
              value: "Done3",
              order: 3,
            },
            {
              type: "text",
              value: "im text1",
              order: 1,
            },
            {
              type: "number",
              value: 100,
              order: 2,
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
          assignedBy: 1234,
          assignedTo: 1234,
          associatedBoardId: "1",
        },
        {
          _id: 2222,
          taskTitle: "Todo",
          createdAt: "date",
          // Aggregation
          users: [{ _id: 1234, name: "shahar" }], // Min users
          // ABIR COLS DONT TOUCH
          columns: [
            {
              type: "label",
              value: "Done3",
              order: 3,
            },
            {
              type: "text",
              value: "im text1",
              order: 1,
            },
            {
              type: "number",
              value: 100,
              order: 2,
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
      ], // Task object
      color: "blue",
      lastUpdatedAt: "",
    },
  };
  AddGroup = () => {
    console.log("Adding a AddGroup!");
    let AddGroup = this.state.group;
    console.log('stategroup:', AddGroup)
    // let boardId = this.props.board._id;
    let board = this.props.currBoard
    console.log('boardfromgroups:', board)
    let newBoard = localBoardService.addGroup(board, AddGroup);
    this.props.saveBoard(newBoard)



  };

  render() {
    return (
      <>
        <div onClick={this.AddGroup}>ADD AddGroup</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard
  };
};
const mapDispatchToProps = {
  saveBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
