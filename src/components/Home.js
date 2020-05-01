import React from 'react';

import Appbar from './Appbar';
import Login from './auth/Login';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: false,
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    if (data === "LOGIN") {
      this.setState({ displayLogin : true });
    } else if (data === "CANCEL") {
      this.setState({ displayLogin : false });
    }
  }

  handleSuccessfulAuth(data) {
    console.log(data);
    this.setState({ displayLogin : false });
    this.props.handleSuccessfulAuth(data);
  }

  displayLogin() {
    if (this.state.displayLogin) {
      return (
        <Login
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        handleLogin={this.handleLogin} />
      )
    }
  }

  render() {
    return (
      <div>
        <Appbar isLoggedIn={this.props.isLoggedIn} handleLogin={this.handleLogin}/>
        <h1>Status: {this.props.isLoggedIn}</h1>
        {this.displayLogin()}
      </div>
    )
  }
}
