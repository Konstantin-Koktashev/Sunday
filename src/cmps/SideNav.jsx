import React from "react";
import { NavLink } from "react-router-dom";
import "../style/cmps/sideNav.css";
import logo from "../style/img/logo.png";
import inbox from "../style/img/mail.svg";
import week from "../style/img/calendar.svg";
import invite from "../style/img/invitation.svg";
import person from "../style/img/person.svg";
import { connect } from 'react-redux'
import notification from "../style/img/notification.svg";
class SideNav extends React.Component {
  render() {
    return (
      <div className="side-nav-container flex col space-evenly">
        <NavLink to="/board">
          <img title="Sunday" className="logo" src={logo} alt="Sunday"></img>
        </NavLink>

        {this.props.userState.loggedInUser && <div onClick={(ev) => this.props.logOut(ev)}> Logout </div>}

        {/* {!this.props.user.loggedInUser && <NavLink to="/login"> Login</NavLink>} */}

        <div
          onClick={() => this.props.toggleNotifications()}
          className="notifications"
        >
          <img
            title="Notifications"
            className="side-nav-img"
            src={notification}
            alt="Notifications"
          ></img>
        </div>

        <NavLink to="/user/inbox" className="inbox">
          <div>
            <img
              title="Inbox"
              className="side-nav-img"
              src={inbox}
              alt="Inbox"
            ></img>
          </div>
        </NavLink>

        <NavLink to="/myweek/" className="my-week-img">
          <div className="flex j-center a-center">
            <img
              title="My Week"
              className="side-nav-img"
              src={week}
              alt="My Week"
            ></img>
          </div>
        </NavLink>

        <NavLink to="/user/invite" className="invite">
          <div>
            <img
              title="Invite Your Team"
              className="side-nav-img"
              src={invite}
              alt="invite"
            ></img>
          </div>
        </NavLink>
        <NavLink to={`/profile/${this.props.user._id}`}>
          <div className="search">
            <img
              title="My Profile"
              className="side-nav-img"
              src={person}
              alt="Profile"
            ></img>
          </div>
        </NavLink>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  //State of the store to this.props of the cmp
  return {
    userState: state.user
  };
};
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
