import React, { Component } from "react";
import { connect } from "react-redux";
import LocalBoardService from "../../services/LocalBoardService";
import { saveBoard, loadBoards } from "../../actions/BoardActions";
import { loadUsers } from "../../actions/UserActions";
import UsersPreviewBox from "../UsersPreviewBox";
import deletePng from "../../style/img/delete.svg";
import { NavLink } from "react-router-dom";
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
    const task = this.props.task;
    const newBoard = LocalBoardService.addPersonToColumn(
      currBoard,
      column,
      task,
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
    const { column, currBoard } = this.props;
    const newBoard = LocalBoardService.removePersonToTask(
      currBoard,
      person,
      column
    );
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
  };
  togglePersonBox = () => {
    this.setState(({ isShown }) => ({
      isShown: !isShown,
    }));
  };
  render() {
    const users = this.props.column.persons;
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
            <div onClick={this.togglePersonBox} className="exit-btn-person">
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
                        <NavLink to={`/profile/${user._id}`}>
                          <button className="person-preview-btn">
                            {user.username}
                          </button>
                        </NavLink>
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
              </div>
            </section>
          </div>
        )}

        {this.state.isShown && (
          <div
            onClick={this.togglePersonBox}
            className="back-screen-label-container"
          ></div>
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