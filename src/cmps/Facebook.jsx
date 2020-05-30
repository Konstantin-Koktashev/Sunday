import React, { Component } from "react";
import { FacebookProvider, LoginButton } from "react-facebook";

export default class Facebook extends Component {
  handleResponse = ({ profile }) => {
    const name = profile.name;
    const email = profile.email;
    const id = profile.id;
    this.props.signUpFacebook(email, id, name);
  };

  handleError = (error) => {
    this.setState({ error });
  };

  render() {
    return (
      <FacebookProvider appId="273810577170429">
        <LoginButton
          scope="email"
          onCompleted={this.handleResponse}
          onError={this.handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    );
  }
}
