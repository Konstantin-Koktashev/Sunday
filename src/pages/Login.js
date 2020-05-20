import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadUsers,
  removeUser,
  login,
  logout,
  signup
} from '../actions/UserActions';

class Login extends Component {
  state = {
    loginCred: {
      email: '',
      password: ''
    }

  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
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

  render() {

    return (<form onSubmit={this.doLogin}>
      <input
        type="text"
        name="email"
        value={this.state.loginCred.email}
        onChange={this.loginHandleChange}
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        name="password"
        value={this.state.loginCred.password}
        onChange={this.loginHandleChange}
        placeholder="Password"
      />
      <br />
      <button>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
