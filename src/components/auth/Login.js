import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from '../../firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      email: "",
      password: "",
      errors: ""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin= this.handleLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(event) {
    this.setState({ open: true });
  }

  handleClose(event) {
    this.setState({ open: false });
    this.setState({ errors: "" });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async handleLogin(event) {
    const { email, password } = this.state;
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((cred) => {
        this.setState({ open: false });
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          this.setState({ errors: "Sorry! We didn't find an account with that email." });  
        } else {
          this.setState({ errors: error.message });
        }
      });
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Login</DialogTitle>
        <DialogContent>
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
        <div style={{ textAlign: "center" }}>
            <p style={{ color: "#747474" }}>
            Don't have an account?
            <Button onClick={event => this.props.switchForm(event, "signup")} style={{ padding: 0 }} color="primary" >Sign Up</Button> now!
          </p>
        </div>
        <p style={{ color: "#E97979" }}>{this.state.errors}</p>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleLogin} color="primary" variant="contained">
          Login
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
