import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/pages/signup.css'
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
            username: '',
            history:[]
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
        const { email, password, username,history } = this.state.signupCred;
        if (!email || !password || !username) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, username,history };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', username: '' } });
    };

    removeUser = userId => {
        this.props.removeUser(userId);
    };
    render() {

        return (
            <div className="signup-form-container">
                <div className="text-float">
                    <h2 className="fade-in">Pursue your passion <br />We'll Manage It</h2>
                </div>
                <div className="text-float-2">
                    <h2 className="fade-in2"> Organized Inspiration</h2>
                </div>
                <div className="text-float-3">
                    <h2 className="fade-in3"> Let us Organize Your Chaos</h2>
                </div>
                <form className="signup-form flex col a-center" onSubmit={this.doSignup}>

                    <h3>Start Your Revolution</h3>
                    <input
                        type="text"
                        name="email"
                        value={this.state.signupCred.email}
                        onChange={this.signupHandleChange}
                        placeholder="Email"
                        required
                    />
                    <br />
                    <input
                        name="password"
                        type="password"
                        value={this.state.signupCred.password}
                        onChange={this.signupHandleChange}
                        placeholder="Password"
                        required
                    />
                    <br />
                    <input
                        type="text"
                        name="username"
                        value={this.state.signupCred.username}
                        onChange={this.signupHandleChange}
                        placeholder="Username"
                        required
                    />
                    <br />

                    <button>Signup</button>
                </form>
                <div className="signup-onlogin col a-center">
                    <h2>Allready Have An Account?</h2>
                    <button onClick={() => this.props.history.push('/login')}>Click Here To Login</button>
                </div>
            </div>
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



