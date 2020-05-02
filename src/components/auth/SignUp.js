import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: "",
      password: "",
      passwordConfirm: "",
      errors: ""
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleOpen(event) {
    this.setState({ open: true });
  }

  handleClose(event) {
    this.setState({ open: false });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleSignUp(event) {
    const { email, password, passwordConfirm } = this.state;
    try {
      if (password.toString() === passwordConfirm.toString()) {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.setState({ open: false });
        alert("Sign up successful!");
      } else {
        alert("Passwords do not match.");
      }
    } catch(error) {
      alert(error);
    }
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign up to keep track of your favorite animes and mangas, get personalized recommendations and more!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
          <TextField
            margin="dense"
            id="passwordConfirm"
            label="Password Confirmation"
            type="password"
            fullWidth
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSignUp} color="primary">
          Sign Up
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
