import React from 'react';
import { Dialog, CircularProgress, Backdrop } from '@material-ui/core';

const CustomBackdrop = (props) => {

  return(
    <Dialog open={props.shouldOpen} style={{ zIndex: 9999999999 }}>
      <Backdrop open={true}>
        <CircularProgress style={{ color: "white" }} />
      </Backdrop>
    </Dialog>
  )
}

export default CustomBackdrop;