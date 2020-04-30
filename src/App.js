import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home }  from './components/Components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: "FALSE",
      user: {}
    }
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.setState({ isLoggedIn: "TRUE" });
  }

  render() {
    return (
      <div>
        <div>
          <Home isLoggedIn={this.state.isLoggedIn} handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        </div>
      </div>
    );
  }
}
