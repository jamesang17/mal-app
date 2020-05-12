import React from 'react';
import { Dialog, CircularProgress } from '@material-ui/core';

const CustomBackdrop = (props) => {

  return(
    <Dialog open={props.shouldOpen} style={{ zIndex: 9999999999, color: "#fff" }}
      PaperProps={{ style: { background: "transparent", boxShadow: "none", alignItems: "center", justifyContent: "center" } }} 
      fullScreen={true}>
      <CircularProgress style={{ color: "white" }} />
    </Dialog>
  )
}

export default CustomBackdrop;