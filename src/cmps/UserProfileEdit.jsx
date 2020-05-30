import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LocalBoardService from '../services/LocalBoardService'
import HttpService from '../services/HttpService'
import UserService from '../services/UserService'
import { loadUsers, setUser } from '../actions/UserActions'

class UserProfileEdit extends Component {
    state = {
        userProfile: {
            title: '',
            email: '',
            phone: '',
            location: '',
            birthday: ''
        }
    }
    componentDidMount() {
        this.setProfileToRender()
    }

    componentDidUpdate(prevProps, prevState) {
        let { currUser } = this.props
        if (JSON.stringify(currUser) !== JSON.stringify(prevProps.currUser)) {
            this.setProfileToRender()
        }
    }
    handleInput = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState(prevState => {
            return {
                userProfile: {
                    ...prevState.userProfile,
                    [field]: value
                }
            }
        })
    }
    onSaveUserProfile = async (ev) => {
        ev.preventDefault()
        const user = this.props.currUser
        const profile = this.state.userProfile
        user.profile = profile
        const updatedUser = await UserService.update(user)
        this.props.setUser(updatedUser)
        this.setProfileToRender(updatedUser)
    }
    setProfileToRender = () => {
        debugger
        const user = this.props.currUser
        if (user.profile) this.setState({ userProfile: user.profile })
        if (!user.profile) this.setState({ userProfile: this.state.userProfile })

    }


    render() {
        const { userProfile } = this.state
        return (
            <div className='user-profile flex col'>
                <form onSubmit={this.onSaveUserProfile} className='user-profile flex col'>
                    <input type="text" value={userProfile.title} onChange={this.handleInput} name="title" />
                    <input type="text" value={userProfile.email} onChange={this.handleInput} name="email" />
                    <input type="number" value={userProfile.phone} onChange={this.handleInput} name="phone" />
                    <input type="text" value={userProfile.location} onChange={this.handleInput} name="location" />
                    <input type="text" value={userProfile.birthday} onChange={this.handleInput} name="birthday " />
                    <button type="submit"></button>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    currUser: state.user.loggedInUser

})

const mapDispatchToProps = {
    loadUsers,
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEdit)
