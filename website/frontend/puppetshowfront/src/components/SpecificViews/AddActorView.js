import React from "react";
import Placard from "../Display/Placard";
import BigLeftCard from "../Layout/BigLeftCard";
import {
  Alert,
  Button,
  IconButton,
  InputLabel,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouteLoaderData } from "react-router-dom";

const styles = {
  submitButton: {},
  inputField: {
    margin: 2,
  },
};

const AddActorView = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [performers, setPerformers] = React.useState(
    useRouteLoaderData("specificScene").performers
  );

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

  const createOutfitHandler = (event) => {
    //Check to see if there is any text in the input box.
    //If there is none, toast an error message.
    const actorNameInput = document.getElementById("actorNameInput");
    const actorDiscordIdInput = document.getElementById("actorDiscordIdInput");

    if (actorNameInput.value.trim() === "") {
      setMessage("Please enter an actor name before continuing!");
      setOpen(true);
    } else if (actorDiscordIdInput.value.trim() === "") {
      setMessage("Please enter the actor's Discord ID before continuing!");
      setOpen(true);
    } else if (isNaN(actorDiscordIdInput.value.trim())) {
      setMessage("Discord ID must be a number!");
      setOpen(true);
    }
    // If there is, send the call to create a new scene, then navigate to that scene's page.
    else {
      console.log("Pretend I am creating an actor!");
      console.log("Pretend I am redirecting to the actor's modification page!");
    }

    // Create the scene, then redirect to that scene's independant view page.
  };
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h4">Add New Actor to Scene</Typography>
      </Placard>
      <Placard sx={{ maxWidth: 650 }}>
        <Typography variant="h6">
          An actor is an animating icon mapped to a specific Discord user id.
          Whenever they're in a voice call with the Puppetmaster bot, any
          animations associated with them will animate when they speak!
        </Typography>
        <TextField
          label="Outfit Name"
          //VANITY: Have the placeholder text pull randomly from a preconfigured list.
          placeholder="e.g. Nill Winter Dress"
          id="actorNameInput"
          sx={styles.inputField}
        />
        <InputLabel id="User ID select">Performer</InputLabel>
        <Select labelId="User ID select">{}</Select>
        <TextField
          label="Actor Discord ID"
          placeholder="e.g. 1234567890"
          id="actorDiscordIdInput"
          sx={styles.inputField}
        />
        <div />
        <Button
          variant="contained"
          onClick={createOutfitHandler}
          sx={styles.submitButton}
        >
          Create new Actor
        </Button>
      </Placard>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackBar}
        action={action}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </BigLeftCard>
  );
};
export default AddActorView;
