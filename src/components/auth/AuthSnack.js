import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default class AuthSnack {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={['top','right']}
        key={`top,right`}
        open={this.state.open}
        autoHideDuration={3000}
        message={this.props.message}
        onClose={this.handleClose}
      >
        <MuiAlert elevation={6} variant="filled" severity={this.props.severity}/>
      </Snackbar>
    )
  }
}
