import React from "react";

import { Typography, Paper, Button, input, IconButton } from "@mui/material";

const styles = {
  paper: {
    alignItems: "center",
    blockSize: 749,
  },
};

const ActiveSceneView = (props) => {
  const redirectToEditScene = (event) => {
    props.history.push(`/scenes/${props.scene.id}/edit`);
  };
  if (props.scene == null) {
    return (
      <Paper sx={styles.paper}>
        <Typography variant="h2" h>
          No scene currently active!
        </Typography>
        <Typography variant="h4">
          Click on a scene to set it as active!
        </Typography>
      </Paper>
    );
  }
  let actorsPreview =
    "No actors currently configured for this scene! Press the edit button to start adding some!";

  if (props.scene.actors != null) {
    if (props.scene.actors.length === 1) {
      actorsPreview = `Includes actor ${props.scene.actors[0].name}`;
    } else if (props.scene.actors.length === 2) {
      actorsPreview = `Includes actors ${props.scene.actors[0].name} and ${props.scene.actors[1].name}!`;
    } else if (props.scene.actors.length > 2) {
      actorsPreview = `Includes actors ${props.scene.actors[0].name}, ${
        props.scene.actors[1].name
      }, and ${props.scene.actors.length - 2} others!`;
    }
  }

  return (
    <Paper sx={styles.paper}>
      <Typography variant="h2" sx={styles.bigTextWithSpacing}>
        {props.scene.sceneName}
      </Typography>
      {props.scene.actors.length > 0 ? (
        <img
          justify="center"
          src={
            props.scene.actors.length > 0
              ? props.scene.actors[0].speakingAnimation
              : ""
          }
          alt={`Preview for scene "${props.scene.sceneName}"`}
        />
      ) : (
        <Typography variant="h4">{props.scene.description}</Typography>
      )}
      {/* <img
        justify="center"
        src={
          props.scene.actors.length > 0
            ? props.scene.actors[0].speakingAnimation
            : ""
        }
        alt={`No scene currently selected!`}
      /> */}
      <Typography variant="h6">{actorsPreview}</Typography>
      <Button onClick={redirectToEditScene}>Edit details</Button>
    </Paper>
  );
};

export default ActiveSceneView;
