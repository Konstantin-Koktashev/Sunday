import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard, loadBoards } from "../../actions/BoardActions";
import { loadUsers } from "../../actions/UserActions";
import LocalBoardService from "../../services/LocalBoardService";
import add from "../../../src/style/img/add.png";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import FormDialog from "../Board/FormDialog";

class AddBoard extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  state = {
    board: {
      // BOARD OBJECT
      name: "New Board",
      createdAt: 1589990735884,
      //CLOUMNS OBJECT
      columns: [
        {
          type: "date",
          value: "Date",
          order: "1",
        },
        {
          type: "people",
          value: "Members",
          order: "2",
        },
        {
          type: "label",
          value: "Labels",
          order: "3",
          color: "#C4C4C4",
        },
        {
          type: "text",
          value: "Text",
          order: "4",
        },
        {
          type: "number",
          value: "Number",
          order: "5",
        },
        {
          type: "priority",
          value: "Priority",
          order: "6",
          color: "#C4C4C4",
        },
      ],
      //Label Object
      labels: [
        {
          color: "",
          value: "",
          order: "",
        },
      ],
      // Aggregation
      admins: [
        {
          userName: "user1412",
          // fullName
          _id: "1",
        },
      ], // Min users
      users: [
        {
          _id: "1",
          userName: "user1412",
          fullName: " full name1412",
          password: "password", // NO PASSWORD
          isAdmin: true,
          imgUrl: "www.img.com",
          lastSeen: "today", // timestamp
          loggedAmount: 2,
          location: "tel aviv",
          notifications: [], //notification object
          boards: [], // Boards ids
        },
        {
          userName: "user112",
          fullName: " full name1123",
          password: "password",
          _id: "1",
          isAdmin: "true",
          imgUrl: "www.img.com",
          lastSeen: "today",
          loggedAmount: 2,
          location: "tel aviv",
          notifications: [], //notification object
          boards: [], // Boards ids
        },
        {
          userName: "user2",
          fullName: " full name2",
          password: "password",
          _id: "1",
          isAdmin: "true",
          imgUrl: "www.img.com",
          lastSeen: "today",
          loggedAmount: 2,
          location: "tel aviv",
          notifications: [], //notification object
          boards: [], // Boards ids
        },
      ], // Min users
      groups: [
        {
          _id: uuidv4(),
          name: "New Project",
          createdAt: "date",
          // ABIR COLS DONT TOUCH

          tasks: [
            {
              _id: uuidv4(),
              isDone: true,
              assignedGroupId: 124,
              taskTitle: "Task - Write you task here",
              createdAt: "",
              // Aggregation
              users: [], // Min users
              // ABIR COLS DONT TOUCH
              columns: [], //  Columns Objects
              updates: [
                {
                  user: {
                    userName: "user1412",
                    _id: "1",
                  },
                  lastUpdate: Date.now(),
                  description: "I changed all",
                  imgUrl: "",
                  aboutUser: 9000,
                },
              ], // updates objects
              notes: [], // Notes objects
              people: [],
              status: "new",
              priority: "urgent",
              DueDate: "",
              budget: "150",
              text: "text about task",
              link: "",
              files: [],
            },
            {
              _id: uuidv4(),
              isDone: true,
              assignedGroupId: 124,
              taskTitle: "Task - Write you task here",
              createdAt: "date",
              // Aggregation
              users: [], // Min users
              // ABIR COLS DONT TOUCH
              columns: [], //  Columns Objects
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
              notes: [], // Notes objects
              people: [],
              status: "new",
              priority: "urgent",
              DueDate: "1592925789",
              budget: "150",
              text: "text about task",
              link: "",
              files: [],
            },
            {
              _id: uuidv4(),
              isDone: true,
              assignedGroupId: 124,
              taskTitle: "Task - Write you task here",
              createdAt: "date",
              // Aggregation
              users: [], // Min users
              // ABIR COLS DONT TOUCH
              columns: [], //  Columns Objects
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
              notes: [], // Notes objects
              people: [],
              status: "new",
              priority: "urgent",
              DueDate: "1595517789",
              budget: "150",
              text: "text about task",
              link: "",
              files: [],
            },
            {
              _id: uuidv4(),
              isDone: true,
              assignedGroupId: 124,
              taskTitle: "Task - Write you task here",
              createdAt: "date",
              // Aggregation
              users: [], // Min users
              // ABIR COLS DONT TOUCH
              columns: [], //  Columns Objects
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
              notes: [], // Notes objects
              people: [],
              status: "new",
              priority: "urgent",
              DueDate: "1606148589",
              budget: "150",
              text: "text about task",
              link: "",
              files: [],
            },
          ], // Task object
          color: "blue",
          lastUpdatedAt: "",
        },
      ],
      //group over

      // _Group Objects
      // Hard coded
      color: "red",
      //history objects,
      history: [],
    },
  };

  addBoard = async (value) => {
    console.log("Adding a Board!");
    let addBoard = this.state.board;
    addBoard.name = value;
    console.log("AddBoard -> addBoard -> addBoard", addBoard);
    try {
      await this.props.saveBoard(addBoard);
      await this.props.loadBoards();
    } catch (error) {
      console.log("couldnt add board");
    }
    // let newBoard = LocalBoardService.saveBoard(AddBoard);
  };

  render() {
    return (
      <>
        <FormDialog addBoard={this.addBoard} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
    users: state.users,
  };
};
const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
