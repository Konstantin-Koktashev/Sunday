import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
import { Link } from 'react-router-dom';
import '../style/pages/home.css'
class Home extends Component {


  render() {
    return (
      <div className="home-container">



        asdas


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
