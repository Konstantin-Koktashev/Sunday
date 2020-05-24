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
        isShown:false
    }

    async componentDidMount() {
        await this.props.loadUsers()
    }

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
    currBoard: state.userBoards.board,
    currUser: state.user.loggedInUser
})


const mapDispatchToProps = {
    saveBoard,
    loadBoards,
    loadUsers

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)
