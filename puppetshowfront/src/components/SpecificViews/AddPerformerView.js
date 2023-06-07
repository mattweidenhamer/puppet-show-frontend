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
import defaultAPICallbackGen from "../../functions/callbacks/defaultAPICallbackGen";

const styles = {
  submitButton: {},
  inputField: {
    margin: 2,
  },
};

const AddPerformerView = (props) => {
  const toaster = props.toaster;

  const createPerformerHandler = async (event) => {
    //Check to see if there is any text in the input box.
    //If there is none, toast an error message.
    const input = document.getElementById("IDInput");

    if (input.value.trim() === "") {
      toaster.message(
        "Please enter your performer's discord ID before continuing!"
      );
      toaster.type("error");
      toaster.open(true);
    }
    // Check to make sure that the box contains a number.
    else if (input.value.trim().match(/^[0-9]+$/) === null) {
      toaster.message("Please enter a valid discord ID before continuing!");
      toaster.type("error");
      toaster.open(true);
    }
    // If there is, send the call to create a new performer.
    else {
      const newPerformer = await addNewPerformer(
        localStorage.getItem("token"),
        {
          discord_snowflake: input.value.trim(),
        },
        defaultAPICallbackGen(toaster)
      );
      if (newPerformer === null) {
        toaster.message("There was an error creating your performer!");
        toaster.type("error");
        toaster.open(true);
      } else {
        console.log("Created new performer");
        console.log(newPerformer);
        toaster.message("Your performer was created successfully!");
        toaster.type("success");
        toaster.open(true);
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
          A performer represents a discord user you would like to animate. In
          order to create a performer, you must have their Discord ID. You must
          also share a server with them.
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
    </BigLeftCard>
  );
};

export default AddPerformerView;
