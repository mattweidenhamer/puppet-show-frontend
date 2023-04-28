import React from "react";

import { Typography, Paper, Button } from "@mui/material";
import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import getDefaultAnimationToDisplay from "../../functions/misc/getDefaultAnimationToDisplay";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

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
  const navigate = useNavigate();
  const redirectToEditScene = (event) => {
    navigate(`/scenes/${props.scene.identifier}`);
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
            The active scene dictates what outfit a performer will "wear" when
            you load the performer's link.
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Think of it like a collection of costumes that your performers will
            pull from!
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
  console.log(props.scene);
  let actorsPreview = "No outfits currently configured for this scene!";

  if (props.scene.outfits != null) {
    if (props.scene.outfits.length === 1) {
      actorsPreview = `Includes outfits such as ${props.scene.outfits[0].outfit_name} for ${props.scene.outfits[0].performer.discord_username}!`;
    } else if (props.scene.outfits.length === 2) {
      actorsPreview = `Includes outfits such as ${props.scene.outfits[0].outfit_name} for ${props.scene.outfits[0].performer.discord_username} and Includes outfits such as ${props.scene.outfits[1].outfit_name} for ${props.scene.outfits[1].performer.discord_username}!`;
    } else if (props.scene.outfits.length > 2) {
      actorsPreview = `Includes outfits such as  Includes outfits such as ${
        props.scene.outfits[0].outfit_name
      } for ${props.scene.outfits[0].performer.discord_username}
       and ${props.scene.outfits.length - 2}
      others!`;
    }
  }

  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2">Active scene:</Typography>

        <Typography variant="h2" sx={styles.bigTextWithSpacing}>
          {props.scene.scene_name}
        </Typography>
      </Placard>
      <div style={styles.imageContainer}>
        <img
          src={
            props.scene.outfits.length > 0
              ? getDefaultAnimationToDisplay(props.scene.outfits[0])
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          style={styles.image}
          alt={`Preview for scene "${props.scene.scene_name}"`}
        />
      </div>
      <Paper sx={styles.placard}>
        <Typography variant="h6">{actorsPreview}</Typography>
      </Paper>
      <Button onClick={redirectToEditScene} variant="contained" color="primary">
        Edit details
      </Button>
    </BigLeftCard>
  );
};

export default ActiveSceneView;
