import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import BigLeftCard from "../Layout/BigLeftCard";
import getDefaultAnimationToDisplay from "../../functions/misc/getDefaultAnimationToDisplay";
import Placard from "../Display/Placard";

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
  const handleUpload = (event) => {};
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2" color="warning.main">
          Update {READABLE_NAMES[props.animationType]} Animation for{" "}
          {props.outfit.outfit_name}
        </Typography>
      </Placard>
      <div style={styles.previewImageContainer}>
        {props.currentAnimation !== null &&
        props.currentAnimation !== undefined ? (
          <img
            style={styles.previewImage}
            src={props.currentAnimation.animation_path}
            alt=""
          />
        ) : // TODO find a replacement image
        null}
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
    </BigLeftCard>
  );
};

export default UploadAnimationView;
