import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/pages/profile.css'
import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
import { Link } from 'react-router-dom';
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
            <div className="profile-page-container">

                <div className="profile-header-container">header
        <h2>Well'come To {user.username} Profile</h2>
                    <img className="user-image-profile" src="google" alt="USER IMAGE"></img>

                </div>
                <div className="over-view-profile">

                    <p>Title:{user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Hello</p>
                    <p>Hello</p>
                </div>


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
