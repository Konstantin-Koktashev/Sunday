import React from "react";
import { NavLink } from "react-router-dom";
import "../style/cmps/sideNav.css";
import logo from "../style/img/logo.png";
import inbox from "../style/img/inbox.png";
import week from "../style/img/week.png";
import invite from "../style/img/invite.png";
import person from "../style/img/person.svg";
import notification from "../style/img/notification.png";
export default function SideNav() {
  return (
    <div className="side-nav-container flex col space-evenly">
      <NavLink to="/home">
        <img title="Sunday" className="logo" src={logo} alt="Sunday"></img>
      </NavLink>
      <div className="notifications">
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

      <div to="/user/profile" className="search">
        <img
          title="My Profile"
          className="side-nav-img"
          src={person}
          alt="Profile"
        ></img>
      </div>
    </div>
  );
}
