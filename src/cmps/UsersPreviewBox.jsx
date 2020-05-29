import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBoards } from "../actions/BoardActions";
import { loadUsers } from "../actions/UserActions";
import moment from "moment";

// moment().startOf(person.lastSeenAt).fromNow();

class UsersPreviewBox extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }
  render() {
    const people = this.props.people ?? [];
    return (
      <div
        className="person-preview flex a-center j-center"
        onClick={() => {
          this.props.togglePersonBox();
        }}
      >
        {people.map((person, idx) => {
          if (idx > 2) return;
          console.log("person", person.username);
          return (
            <div
              className="user-preview-circle-column"
              title={`${person.username} Last seen at ${moment(
                person.lastSeenAt
              ).fromNow()}`} ////  LAST SEEN -DONE!
              key={idx}
            >
              {person.username.charAt(0).toUpperCase()}
            </div>
          );
        })}
        {/* Add */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadBoards,
  loadUsers,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPreviewBox);
