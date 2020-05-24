import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/pages/profile.css'
import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
// import { Link } from 'react-router-dom';

import UserService from '../../src/services/UserService'
class Profile extends Component {
    state = {
        user: null
    };


    componentDidMount = async () => {
        await this.loadUser()

    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadUser()
        }
        // if (JSON.stringify(this.props.currBoard) !== JSON.stringify(prevProps.currBoard)) {
        //     this.loadboards()
        // }

    }

    loadUser = async () => {
        let user = await UserService.getById(this.props.match.params.id)
        this.setState({ user: user })
    }



    render() {
        const user = this.state.user
        return (
            <>
                {user && <div className="profile-page-container">

                    <div className="profile-header-container">
                        {/* <img className="user-image-profile" src="google" alt="USER IMAGE"></img> */}
                        <div className="profile-circle-big flex a-center j-center">{user.username.charAt(0).toUpperCase()}</div>
                        <h2>{user.username} Profile</h2>

                    </div>
                    <div className="over-view-profile flex col">
                        <h2>Over View</h2>
                        <p>Title: <span>{user.username}</span></p>
                        <p>Email: <span>{user.email}</span></p>


                    </div>


                </div>}</>
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
