import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style/signup.css'
import {
    loadUsers,
    removeUser,
    login,
    logout,
    signup
} from '../actions/UserActions';

class Signup extends Component {
    state = {
        signupCred: {
            email: '',
            password: '',
            username: ''
        }
    };



    signupHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doLogin = async ev => {
        ev.preventDefault();
        const { email, password } = this.state.loginCred;
        if (!email || !password) {
            return this.setState({ msg: 'Please enter user/password' });
        }
        const userCreds = { email, password };
        this.props.login(userCreds);
        this.setState({ loginCred: { email: '', password: '' } });
    };

    doSignup = async ev => {
        ev.preventDefault();
        const { email, password, username } = this.state.signupCred;
        if (!email || !password || !username) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, username };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', username: '' } });
    };

    removeUser = userId => {
        this.props.removeUser(userId);
    };
    render() {

        return (<form onSubmit={this.doSignup}>
            <input
                type="text"
                name="email"
                value={this.state.signupCred.email}
                onChange={this.signupHandleChange}
                placeholder="Email"
            />
            <br />
            <input
                name="password"
                type="password"
                value={this.state.signupCred.password}
                onChange={this.signupHandleChange}
                placeholder="Password"
            />
            <br />
            <input
                type="text"
                name="username"
                value={this.state.signupCred.username}
                onChange={this.signupHandleChange}
                placeholder="Username"
            />
            <br />
            <button>Signup</button>
        </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading
    };
};
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);



