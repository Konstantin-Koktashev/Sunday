import React from "react";
import { NavLink } from "react-router-dom";
import "../style/cmps/sideNav.css";
export default function SideNav() {
  return (
    <div className="side-nav-container flex col space-evenly">
      <NavLink to="/home" className="logo">
        <img src=""></img>
        Logo
      </NavLink>
      <div className="notifications"> Notifications</div>
      <NavLink to="/user/inbox" className="inbox">
        <img src=""></img>
        Inbox
      </NavLink>
      <NavLink to="/user/myWeek" className="my-week">
        <img src=""></img>
      </NavLink>
      My Week
      <NavLink to="/user/invite" className="invite">
        <img src=""></img>
      </NavLink>
      <div to="/user/profile" className="search">
        <img src=""></img>
        Profile
      </div>
    </div>
  );
}
