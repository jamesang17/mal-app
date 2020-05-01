import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      errors: "",
      registration: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handeLogin= this.handleLogin.bind(this);
    this.handleRegistration= this.handleRegistration.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCancel(event) {
    console.log("Cancelling");
    this.props.handleLogin("CANCEL");
    this.setState({ registration: false });
  }

  handleSignUp(event) {
    console.log("Clicked sign up");
    this.setState({ registration: true });
  }

  async handleRegistration(event) {
    console.log("Form submitted");
    const { email, password, passwordConfirm } = this.state;
    if (this.doPasswordsMatch(password, passwordConfirm)) {
      this.props.handleSuccessfulAuth("SUCCESS");
      this.setState({ success: true });
      // await auth.createUserWithEmailAndPassword(email, password)
      //   .then((cred) => {
      //     console.log(cred);
      //   });
    } else {
      this.setState({ error: true });
    }
    this.setState({ success: false, error: false });
    event.preventDefault();
  }

  doPasswordsMatch(password, passwordConfirm) {
    return password.toString() === passwordConfirm.toString();
  }

  async handleLogin(event) {
    console.log("Login form submitted")
    const { email, password } = this.state;
    event.preventDefault();
  }

  displayRegistration() {
    if (this.state.registration) {
      return (
        <div>
          <TextField
            autoFocus margin="dense"
            id="passwordConfirm" label="Confirm Password"
            type="password" fullWidth required
            onChange={this.handleChange}
          />
          <Button color="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleRegistration} color="primary">
            Sign Up
          </Button>
        </div> 
      )
    } else {
      return (
        <div>
          <Button color="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button onClick={this.handleLogin} color="primary">
            Login
          </Button>
          <Button onClick={this.handleSignUp} color="primary">
            Sign Up
          </Button> 
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <TextField
          autoFocus margin="dense"
          id="email" label="Email"
          type="email" fullWidth required
          onChange={this.handleChange}
        />
        <TextField
          autoFocus margin="dense"
          id="password" label="Password"
          type="password" fullWidth required
          onChange={this.handleChange}
        />
        {this.displayRegistration()}
      </div>
    )
  }
}
