import React from "react";

import { Typography, Paper, Button } from "@mui/material";
import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";

const styles = {
  imageContainer: {
    width: "300px",
    height: "300px",
    border: `2px solid red`,
    display: "flex",
    justify: "center",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
  placard: {
    padding: 2,
    margin: 3,
  },
};

const ActiveSceneView = (props) => {
  const redirectToEditScene = (event) => {
    props.history.push(`/scenes/${props.scene.id}/edit`);
  };

  if (props.scene == null) {
    return (
      // <Paper sx={styles.paper}>
      <BigLeftCard>
        <Placard>
          <Typography variant="h2">No scene currently active!</Typography>
        </Placard>

        <Placard>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            The active scene dictates what an actor will be "wearing" when you
            load an actor's individual link.
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Think of it as a configuration of an actor's costume, all grouped
            together for easy use!
            <br />
            Add a scene with the "Add scene" button
            {props.numScenes === 0
              ? "to get started!"
              : ", or select a scene from the ones already set up."}
            <br />
            When you set a scene as active, it will be seen here!
          </Typography>
        </Placard>
      </BigLeftCard>
      //</Paper>
    );
  }
  let actorsPreview = "No actors currently configured for this scene!";

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
    <BigLeftCard>
      <Paper sx={styles.placard}>
        <Typography variant="h2" sx={styles.bigTextWithSpacing}>
          {props.scene.sceneName}
        </Typography>
      </Paper>
      <div style={styles.imageContainer}>
        <img
          src={
            props.scene.actors.length > 0
              ? props.scene.actors[0].speakingAnimation
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          style={styles.image}
          alt={`Preview for scene "${props.scene.sceneName}"`}
        />
        {/* <img
        justify="center"
        src={
          props.scene.actors.length > 0
            ? props.scene.actors[0].speakingAnimation
            : ""
        }
        alt={`No scene currently selected!`}
      /> */}
      </div>
      {/* FIXME currently the length of this is affecting the spacing of the block above it. */}
      <Paper sx={styles.placard}>
        <Typography variant="h6">{actorsPreview}</Typography>
      </Paper>
      <Button onClick={redirectToEditScene}>Edit details</Button>
    </BigLeftCard>
  );
};

export default ActiveSceneView;
