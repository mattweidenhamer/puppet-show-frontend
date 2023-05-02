import React from "react";
import { Snackbar } from "@mui/material";

const Toaster = (props) => {
  //Toaster my beloved

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      {props.children}
    </Snackbar>
  );
};

export default Toaster;
