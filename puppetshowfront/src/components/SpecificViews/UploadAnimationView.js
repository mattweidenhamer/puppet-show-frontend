import React from "react";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import BigLeftCard from "../Layout/BigLeftCard";
import getDefaultAnimationToDisplay from "../../functions/misc/getDefaultAnimationToDisplay";
import Placard from "../Display/Placard";
import Toaster from "../Display/Toaster";
import NoAnimationSet from "../../images/NoAnimationsSet.png";

const styles = {
  previewImageContainer: {
    width: "150px",
    height: "150px",
    //borderRadius: "50%", //Uncomment for rounded circle
    border: `2px solid red`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
};
const READABLE_NAMES = {
  START_SPEAKING: "Speaking",
  NOT_SPEAKING: "Not Speaking",
  SLEEPING: "Sleeping",
  CONNECTION: "Connection",
  DISCONNECTION: "Disconnection",
};

const UploadAnimationView = (props) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");

  const handleUpload = (event) => {
    const animationUrl = document.getElementById("animation_url").value;
    if (animationUrl.trim() === "") {
      setMessage("Please enter a valid url!");
      setType("error");
      setOpen(true);
      return;
    }
    const animationType = props.animationType;
    const newAnimation = {
      animation_type: animationType,
      animation_path: animationUrl,
      outfit_identifier: props.outfit.identifier,
    };
    props.uploadAnimation(newAnimation);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let alert = (
    <Alert severity={type} onClose={handleClose}>
      {message}
    </Alert>
  );
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2" color="warning.main">
          Update {READABLE_NAMES[props.animationType]} Animation for{" "}
          {props.outfit.outfit_name}
        </Typography>
      </Placard>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Current animation:{" "}
      </Typography>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={
            props.currentAnimation !== null &&
            props.currentAnimation !== undefined
              ? props.currentAnimation.animation_path
              : NoAnimationSet
          }
          alt=""
        />
      </div>
      <Placard sx={{ minWidth: 500 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Change or upload an animation
        </Typography>
        <TextField
          sx={{ minWidth: 400 }}
          id="animation_url"
          label="Animation url"
          variant="outlined"
        />
        <br />
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{ marginTop: 2 }}
        >
          Update animation
        </Button>
      </Placard>
      <Toaster
        open={open}
        message={message}
        severity={type}
        handleClose={handleClose}
      >
        {alert}
      </Toaster>
    </BigLeftCard>
  );
};

export default UploadAnimationView;
