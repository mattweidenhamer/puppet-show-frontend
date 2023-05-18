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
import addNewScene from "../../functions/setters/scenes/addNewScene";

const styles = {
  submitButton: {},
  inputField: {
    margin: 2,
  },
};

const AddSceneView = (props) => {
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

  const createSceneHandler = async (event) => {
    //Check to see if there is any text in the input box.
    //If there is none, toast an error message.
    const input = document.getElementById("sceneNameInput");

    if (input.value.trim() === "") {
      setMessage("Please enter a scene name before continuing!");
      setSeverity("error");
      setOpen(true);
    }
    // If there is, send the call to create a new scene, then navigate to that scene's page.
    else {
      const newScene = await addNewScene(localStorage.getItem("token"), {
        scene_name: input.value,
      });
      if (newScene === null) {
        setMessage("There was an error creating your scene!");
        setSeverity("error");
        setOpen(true);
      } else {
        console.log("Created new scene");
        console.log(newScene);
        setMessage("Your scene was created successfully!");
        setSeverity("success");
        setOpen(true);
      }
      props.onSceneCreate(newScene);
    }

    // Create the scene, then redirect to that scene's independant view page.
  };
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h4">Add Scene</Typography>
      </Placard>
      <Placard sx={{ maxWidth: 550 }}>
        <Typography variant="h6">
          A scene is a collection of actor configuration information, reading
          presented for you to edit.
        </Typography>
        <TextField
          placeholder="Scene Name"
          id="sceneNameInput"
          sx={styles.inputField}
        />
        <div />
        <Button
          variant="contained"
          onClick={createSceneHandler}
          sx={styles.submitButton}
        >
          Create my scene!
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

export default AddSceneView;
