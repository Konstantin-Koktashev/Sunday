import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
import { Link } from 'react-router-dom';

class Profile extends Component {
    state = {

    };


    render() {
        return (
            <div className="profile-page-container">
                hello
                assssssssssssssssssssssssssssssssssssssssssssssssss
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.review.reviews,
        users: state.user.users,
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    loadReviews,
    loadUsers,
    addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
