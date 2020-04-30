import React from 'react';

import Appbar from './Appbar';
import Registration from './auth/Registration';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRegistration: false,
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration(data) {
    if (data === "LOGIN") {
      this.setState({ openRegistration: true });
    } else if (data === "CANCEL") {
      this.setState({ openRegistration: false });
    }
  }

  handleSuccessfulAuth(data) {
    console.log(data);
    this.setState({ openRegistration: false });
    this.props.handleSuccessfulAuth(data);
  }

  displayRegistration() {
    if (this.state.openRegistration) {
      return (
        <Registration
        handleSuccessfulAuth={this.handleSuccessfulAuth}
        handleRegistration={this.handleRegistration} />
      )
    }
  }

  render() {
    return (
      <div>
        <Appbar isLoggedIn={this.props.isLoggedIn} handleRegistration={this.handleRegistration}/>
        <h1>Status: {this.props.isLoggedIn}</h1>
        {this.displayRegistration()}
      </div>
    )
  }
}
