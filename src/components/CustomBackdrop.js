import React from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';

const CustomBackdrop = (props) => {

  return(
    <Dialog open={props.shouldOpen} style={{ zIndex: 999, color: "#fff" }}
      PaperProps={{ style: { background: "transparent", boxShadow: "none" } }} >
      <CircularProgress style={{ color: "white" }} />
    </Dialog>
  )
}

export default CustomBackdrop;