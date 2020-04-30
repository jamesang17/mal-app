import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      registrationErrors: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleSubmit(event) {
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

  doPasswordsMatch(password,passwordConfirm) {
    return password.toString() === passwordConfirm.toString();
  }

  handleCancel(event) {
    console.log("Cancelling");
    this.props.handleRegistration("CANCEL");
  }

  render() {
    return (
      <div>
        <TextField
        autoFocus margin="dense"
        id="email" label="Email"
        type="email" fullWidth
        onChange={this.handleChange}
        />
        <TextField
        autoFocus margin="dense"
        id="password" label="Password"
        type="password" fullWidth
        onChange={this.handleChange}
        />
        <TextField
        autoFocus margin="dense"
        id="passwordConfirm" label="Confirm Password"
        type="password" fullWidth
        onChange={this.handleChange}
        />
        <Button color="secondary" onClick={this.handleCancel}>
          Cancel
        </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Register
        </Button>
      </div>
    )
  }
}
