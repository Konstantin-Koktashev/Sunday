import { connect } from "react-redux";
import React, { Component } from "react";
import { saveBoard, loadBoards } from "../../actions/BoardActions";
import {loadUsers} from '../../actions/UserActions'
import LocalBoardService from "../../services/LocalBoardService";
import add from "../../../src/style/img/add.png";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'

class AddBoard extends Component {


  componentDidMount() {
    this.props.loadUsers()
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
          value: "people",
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
        {
          type: "priority",
          value: "priority",
          order: "6",
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
              isDone:true,
              assignedGroupId: 124,
              taskTitle: "Task - Wright you task here",
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
              status: "new",
              priority: "urgent",
              DueDate: "",
              budget: "150",
              text: "text about task",
              link: "",
            },
            {
              _id: uuidv4(),
              isDone:true,
              assignedGroupId: 124,
              taskTitle: "Task - Wright you task here",
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
              status: "new",
              priority: "urgent",
              DueDate: "1592925789",
              budget: "150",
              text: "text about task",
              link: "",
            },
            {
              _id: uuidv4(),
              isDone:true,
              assignedGroupId: 124,
              taskTitle: "Task - Wright you task here",
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
              status: "new",
              priority: "urgent",
              DueDate: "1595517789",
              budget: "150",
              text: "text about task",
              link: "",
            },
            {
              _id: uuidv4(),
              isDone:true,
              assignedGroupId: 124,
              taskTitle: "Task - Wright you task here",
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
              status: "new",
              priority: "urgent",
              DueDate: "1606148589",
              budget: "150",
              text: "text about task",
              link: "",
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
   history:[]
    },
  };

   confirmDelet= async()=> Swal.fire({
    title: "An input!",
    text: "Write something interesting:",
    type: "input",
    closeOnConfirm: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Creat Project'
  }).then((inputValue) => {
    if(inputValue === false) return
    if (inputValue === "") {
      Swal.showInputError("You need to write something!");
      return false
    }
    if (inputValue) {
      Swal.fire(
        'Created!'
        )
         this.AddBoard(inputValue)     
    }
  })

  AddBoard = async (name) => {
    console.log("Adding a Board!");
    let AddBoard = this.state.board;
    AddBoard.name=name
    try {
      await this.props.saveBoard(AddBoard);
      await this.props.loadBoards();
    } catch (error) {
      console.log('couldnt add board');
    }
    // let newBoard = LocalBoardService.saveBoard(AddBoard);
  };

  render() {
    return (
      <>
        <img
          className="add-board-btn"
          onClick={this.confirmDelet}
          src={add}
          alt="Add"
          title="Add Board"
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards.board,
    users:state.users
  };
};
const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard);
