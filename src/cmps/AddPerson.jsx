import React, { Component } from "react";
import { connect } from "react-redux";
import localBoardService from "../services/localBoardService";
import { saveBoard, loadBoards } from "../actions/boardActions";
import { loadUsers } from "../actions/UserActions";
import UsersPreviewBox from "./UsersPreviewBox";
import deletePng from "../style/img/delete.svg";
class AddPerson extends Component {
  state = {
    usersToAdd: null,
    isShown: false,
  };

  async componentDidMount() {
    await this.props.loadUsers();
  }

  addPerson = (person) => {
    this.setState({ isShown: false });
    const column = this.props.column;
    const currBoard = this.props.currBoard;
    const newBoard = localBoardService.addPersonToColumn(
      currBoard,
      column,
      person
    );
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  searchPeople = (e) => {
    e.preventDefault();
    const users = this.props.users;
    const usersToAdd = users.filter((user) => {
      return user.username.includes(e.target.value);
    });
    this.setState({ usersToAdd });
  };
  removePerson = (person) => {
    // const column=this.props.column
    // const currBoard=this.props.currBoard
    const { column, currBoard } = this.props;
    const newBoard = localBoardService.removePersonToTask(
      currBoard,
      person,
      column
    );
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  togglePersonBox = () => {
    this.setState({ isShown: true });
  };

  render() {
    const isShows = this.state.isShows;
    const users = this.props.column.persons;
    const allUsers = this.props.users;
    const isShown = this.state.isShown;
    const usersToAdd = this.state.usersToAdd;
    return (
      <React.Fragment>
        <UsersPreviewBox
          people={users}
          togglePersonBox={this.togglePersonBox}
        ></UsersPreviewBox>
        {isShown && (
          <div className="person-component flex col">
            <div onClick={this.togglePersonBox} className="">
              X
            </div>
            <input
              placeholder="Search People"
              onChange={(e) => this.searchPeople(e)}
            />

            <section className="people-in-task">
              {users &&
                users.map((user, idx) => {
                  return (
                    <section key={idx} className="peron-preview-delet">
                      <div className="flex space-between">
                        <button className="person-preview-btn">
                          {user.username}
                        </button>
                        <img
                          className="delete-icon person-remove"
                          src={deletePng}
                          alt="Delete"
                          title="Delete Task"
                          onClick={() => this.removePerson(user)}
                        />
                      </div>
                    </section>
                  );
                })}
              {/* {!users&&    <input onChange={(e)=>this.searchPeople(e)}></input>} */}
            </section>
            <hr></hr>
            <span>Invite your Team:</span>
            <section className="found-people">
              {usersToAdd &&
                usersToAdd.map((user, idx) => {
                  return (
                    <article
                      key={idx}
                      className="min-user-card"
                      onClick={() => this.addPerson(user)}
                    >
                      <img></img>
                      <span>{user.username}</span>
                    </article>
                  );
                })}
              <div className="invite-with-email">
                <img></img>
                <span>Invite User By Email</span>
              </div>
            </section>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  currBoard: state.userBoards.currBoard,
  currUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson);
