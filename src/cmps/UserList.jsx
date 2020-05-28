import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBoards } from "../actions/BoardActions";
import { loadUsers } from "../actions/UserActions";
import moment from "moment";
import "../style/cmps/userList.css";
// moment().startOf(person.lastSeenAt).fromNow();
import FilterByText from "../cmps/Filters/FilterByText";

class UserList extends Component {
  state = {
    text: "",
  };

  setUserFilter = (value) => {
    this.setState({ text: value });
  };

  UserFilter = () => {
    let value = this.state.text;
    let filteredUsers = this.props.users.filter((user) => {
      let name = user.username.toLowerCase();

      if (name.includes(value.toLowerCase())) return true;
    });
    return filteredUsers;
  };
  componentDidMount() {}
  render() {
    return (
      <div className="user-list-container flex col  j-center">
        <div className="user-list-topbar flex col a-center j-center">
          <h2>Search Users</h2>

          <FilterByText
            setUserFilter={this.setUserFilter}
            users={this.props.users}
          />
        </div>

        {this.UserFilter().map((user, idx) => {
          return (
            <div
              className="user-preview-circle-column"
              title={`${user.username} Last seen at ${moment(
                user.lastSeen
              ).fromNow()}`}
              key={idx}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
});

const mapDispatchToProps = {
  loadBoards,
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
