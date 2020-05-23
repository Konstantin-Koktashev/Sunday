import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard, loadBoards } from "../actions/boardActions";
import localBoardService from "../services/localBoardService";
import { Loading } from "./Loading";

class AddGroup extends Component {
  state = {
    isLoading: true,
    group: {
      id: "hirbush",
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
        {
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
        {
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
        {
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
      ], // Task object
      color: "blue",
      lastUpdatedAt: "",
    },
  };
  AddGroup = () => {
    console.log("Adding a AddGroup!");
    let AddGroup = this.state.group;
    console.log("stategroup:", AddGroup);
    // let boardId = this.props.board._id;
    let board = this.props.currBoard;
    console.log("boardfromgroups:", board);
    let newBoard = localBoardService.addGroup(board, AddGroup);
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
    // console.log("AddGroup -> AddGroup -> newBoard", newBoard);
  };

  render() {
    return (
      <>
        <div
          className="add-group-btn flex a-center j-center"
          title="Add a New Group"
          onClick={this.AddGroup}
        >
          <div
            className={`${this.state.isLoading ? "loading" : "loading-hidden"}`}
          >
            <Loading></Loading>
          </div>
          New Group
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
