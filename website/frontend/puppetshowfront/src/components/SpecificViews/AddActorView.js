import React from "react";
import Placard from "../Display/Placard";
import BigLeftCard from "../Layout/BigLeftCard";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  submitButton: {
    marginTop: 2,
  },
  inputField: {
    margin: 2,
  },
  inputSelector: {
    minWidth: 200,
    alignContent: "left",
  },
};

const AddActorView = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [performerId, setPerformerId] = React.useState(""); //TODO find a way to do this without using a state
  const performers = props.performers;

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
    //Check to see if there is any text in the input bo or the performer selector.
    //If there is none, toast an error message.
    const outfitNameInput = document.getElementById("outfitNameInput");
    const doRedirect = document.getElementById("doRedirect").checked;

    if (outfitNameInput.value.trim() === "") {
      setMessage("Please enter an actor name before continuing!");
      setOpen(true);
    } else if (performerId === undefined || performerId === "") {
      setMessage("Please select a performer before continuing!");
      setOpen(true);
    } else {
      // Then, check to make sure that the performer doesn't already have an outfit for this scene.
      // If they do, toast an error message.
      // Otherwise, create the outfit
      if (props.checkPerformerHasOutfit(performerId)) {
        setMessage(
          "This performer already has an outfit for this scene! Please select a different performer."
        );
        setOpen(true);
      } else {
        props.onCreateOutfit(performerId, outfitNameInput.value, doRedirect);
      }
    }

    // Create the scene, then redirect to that scene's independant view page.
  };
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h4">Add New Outfit to Scene</Typography>
      </Placard>
      <Placard sx={{ maxWidth: 650 }}>
        <Typography variant="h6">
          An Outfit is the set of animations that your Performer will use. When
          you change your active scene, all of your performers will change their
          animations to match their outfit in the new scene.
        </Typography>

        <FormControl>
          <TextField
            label="Outfit Name"
            //VANITY: Have the placeholder text pull randomly from a preconfigured list.
            placeholder="e.g. Nill Winter Dress"
            id="outfitNameInput"
            sx={styles.inputField}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel id="User ID select">Performer</InputLabel>
          <Select
            label="Performer"
            defaultValue={""}
            id="performerId"
            sx={styles.inputSelector}
            onChange={(event) => setPerformerId(event.target.value)}
          >
            <MenuItem value={""}>None</MenuItem>
            {performers.map((performer) => (
              <MenuItem
                value={performer.identifier + ""}
                key={performer.identifier}
              >
                {performer.discord_username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <FormControlLabel
            control={
              <Switch
                id="doRedirect"
                defaultChecked
                label="Edit outfit on creation"
              />
            }
            label="View outfit now"
          />
        </FormControl>

        {/* <TextField
          label="Actor Discord ID"
          placeholder="e.g. 1234567890"
          id="actorDiscordIdInput"
          sx={styles.inputField}
        /> */}
        <div />
        <Button
          variant="contained"
          onClick={createOutfitHandler}
          sx={styles.submitButton}
        >
          Create new Outfit
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
