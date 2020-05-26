import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/pages/profile.css'
import { loadReviews, addReview } from '../actions/ReviewActions.js';
import { loadUsers } from '../actions/UserActions.js';
// import { Link } from 'react-router-dom';
import { setChatType, upload } from "../actions/UserActions";
import { setCurrChatRoom } from '../actions/ChatActions'


import UserService from '../../src/services/UserService'
import ChatService from '../services/ChatService';
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

    setPrivateChat = async (myId, toUserId) => {
        let chatWith = {
            id: { myId, toUserId },
            type: 'private'
        }

        let allMsgs = await this.props.loadRooms()
        let room = ChatService.getMsgsById(chatWith, allMsgs)
        await this.props.setCurrChatRoom(room)
        await this.props.setChatType(chatWith)

    }


    uploadImg = async (ev, user) => {
        await this.props.upload(ev, user)
        this.loadUser()

    }


    render() {
        const user = this.state.user
        console.log('userfromprofie page ', user)
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
                        <button onClick={() => this.setPrivateChat(this.props.loggedInUser._id, user._id)}>Chat With {user.username}</button>
                        <input onChange={(ev) => this.uploadImg(ev, user)} type="file" className="upload" accept="image/png, image/jpeg"></input>
                        {user && user.imgUrl && <img className="profile-img" src={`${user.imgUrl}`}></img>}
                    </div>
                </div>}




            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.review.reviews,
        users: state.user.users,
        loggedInUser: state.user.loggedInUser,
        userState: state.user,
        chat: state.chat
    };
};
const mapDispatchToProps = {
    loadReviews,
    loadUsers,
    addReview,
    setChatType,
    setCurrChatRoom,
    upload

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
