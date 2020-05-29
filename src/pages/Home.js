import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
import { NavLink } from 'react-router-dom';
import '../style/pages/home.css'
import logo from "../style/img/logo.png";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-top-bar-container">

          <div className="home-logo-container flex a-center"> <NavLink to="/board">
            <img title="Sunday" className="logo" src={logo} alt="Sunday"></img>Sunday<span>.com</span>
          </NavLink></div>
        </div>
        <div className="home-main-content flex col a-center">
          <h3 className="tracking-in-expand"><div className="sun">Sun</div>day<span className="swing-in-top-fwd-text">.com</span></h3>
          <p className="puff-in-center">For every minute spent organizing, an hour is earned</p>
        </div>
        <NavLink to="/board/guest/true">
          <button className="get-started-btn get-started-btn-anim">Get Started</button>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  loadReviews,
  loadUsers,
  addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
