import React from "react";
import { Button, IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Currently not working, come back and reevaluate when you have time.
const ClosableAlert = (props) => {
  let defaultOpen = false;

  if (props.open !== undefined) {
    defaultOpen = props.open;
  }
  const [open, setOpen] = React.useState(defaultOpen);

  let closeSnackBar = (event, reason) => {
    setOpen(false);
  };
  if (props.closeSnackBar !== undefined) {
    closeSnackBar = props.closeSnackBar;
  }

  const onClose = (event) => {};

  const action = () => {
    if (props.action !== undefined) {
      return props.action;
    }
    return (
      <IconButton color="inherit" size="small" onClick={closeSnackBar}>
        <CloseIcon />
      </IconButton>
    );
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={props.severity} action={action}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default ClosableAlert;
