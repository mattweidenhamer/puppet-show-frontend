import React from "react";
import Placard from "../Display/Placard";
import BigLeftCard from "../Layout/BigLeftCard";
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import addNewPerformer from "../../functions/setters/performers/addNewPerformer";

const styles = {
  submitButton: {},
  inputField: {
    margin: 2,
  },
};

const AddPerformerView = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const closeSnackBar = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const createPerformerHandler = async (event) => {
    //Check to see if there is any text in the input box.
    //If there is none, toast an error message.
    const input = document.getElementById("IDInput");

    if (input.value.trim() === "") {
      setMessage("Please enter your performer's discord ID before continuing!");
      setSeverity("error");
      setOpen(true);
    }
    // If there is, send the call to create a new scene, then navigate to that scene's page.
    else {
      const newPerformer = await addNewPerformer(
        localStorage.getItem("token"),
        {
          discord_snowflake: input.value.trim(),
        }
      );
      if (newPerformer === null) {
        setMessage("There was an error creating your performer!");
        setSeverity("error");
        setOpen(true);
      } else {
        console.log("Created new performer");
        console.log(newPerformer);
        setMessage("Your performer was created successfully!");
        setSeverity("success");
        setOpen(true);
        props.onPerformerCreate(newPerformer);
      }
    }
  };
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h4">Add a performer</Typography>
      </Placard>
      <Placard sx={{ maxWidth: 550 }}>
        <Typography variant="h6">
          A performer is a person who will be playing a character in your show.
          In order to create a performer, you must have their Discord ID. You
          must also share a server with them.
        </Typography>
        <TextField
          placeholder="Performer ID"
          id="IDInput"
          sx={styles.inputField}
        />
        <div />
        <Button
          variant="contained"
          onClick={createPerformerHandler}
          sx={styles.submitButton}
        >
          Create my performer!
        </Button>
      </Placard>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackBar}
        action={action}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </BigLeftCard>
  );
};

export default AddPerformerView;
