import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/pages/login.css'
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
    try {
      await this.props.login(userCreds)
      // redirect
      this.props.history.push('/');
    } catch (err) {
      // show invalid credentials msg?
      console.log('THANK U YONI')
    }

    this.setState({ loginCred: { email: '', password: '' } });
  };

  render() {

    return (
      <div className="login-form-container col flex j-center a-center">
        <div className="text-float">
          <h2 className="fade-in">Pursue your passion <br />We'll Manage It</h2>
        </div>
        <div className="text-float-2">
          <h2 className="fade-in2"> Organized Inspiration</h2>
        </div>
        <div className="text-float-3">
          <h2 className="fade-in3"> Let us Organize Your Chaos</h2>
        </div>

        <form className="login-form flex a-center col" onSubmit={this.doLogin}>
          <h3>Simply Login</h3>
          <input
            type="text"
            name="email"
            value={this.state.loginCred.email}
            onChange={this.loginHandleChange}
            placeholder="Enter Your Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            placeholder="Enter Password"
            required
          />
          <br />
          <button>Login</button>
        </form>
        <div className="signup-onlogin col a-center">

          <h2>Still Dont Have An Account?</h2>
          <button onClick={() => this.props.history.push('/signup')}>Click Here To Signup</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
