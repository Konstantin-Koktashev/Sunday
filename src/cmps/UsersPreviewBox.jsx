import React, { Component } from "react";
import { connect } from "react-redux";
import { loadBoards } from "../actions/BoardActions";
import { loadUsers } from "../actions/UserActions";

class UsersPreviewBox extends Component {
  componentDidMount() {
    this.props.loadUsers();
    console.log(" IMG HEREE @@@@@@@@@@@");
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
          console.log("person", person.username);
          return (
            <div
              className="user-preview-circle-column"
              title={`${person.username} Last seen at ${person.lastSeenAt}`} //// NEED TO FIX LAST SEEN
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
