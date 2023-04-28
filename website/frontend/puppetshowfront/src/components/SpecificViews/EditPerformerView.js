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

const EditPerformerView = (props) => {
  const navigate = useNavigate();
  const redirectToEditScene = (event) => {
    navigate(`/scenes/${props.scene.identifier}`);
  };

  // if (props.perforomer == null) {
  //   return (
  //     // <Paper sx={styles.paper}>
  //     <BigLeftCard>
  //       <Placard>
  //         <Typography variant="h2">No scene currently active!</Typography>
  //       </Placard>

  //       <Placard>
  //         <Typography variant="h5" sx={{ textAlign: "left" }}>
  //           The active scene dictates what outfit a performer will "wear" when
  //           you load the performer's link.
  //         </Typography>
  //         <Typography variant="h6" sx={{ textAlign: "left" }}>
  //           Think of it like a collection of costumes that your performers will
  //           pull from!
  //           <br />
  //           Add a scene with the "Add scene" button
  //           {props.numScenes === 0
  //             ? "to get started!"
  //             : ", or select a scene from the ones already set up."}
  //           <br />
  //           When you set a scene as active, it will be seen here!
  //         </Typography>
  //       </Placard>
  //     </BigLeftCard>
  //     //</Paper>
  //   );
  // }
  let actorsPreview = "No performers currently configured for this scene!";

  if (props.scene.actors != null) {
    if (props.scene.actors.length === 1) {
      actorsPreview = `Includes an outfit for ${props.scene.actors[0].actor_name}`;
    } else if (props.scene.actors.length === 2) {
      actorsPreview = `Includes outfits for ${props.scene.actors[0].actor_name} and ${props.scene.actors[1].actor_name}!`;
    } else if (props.scene.actors.length > 2) {
      actorsPreview = `Includes outfits for ${
        props.scene.actors[0].actor_name
      }, ${props.scene.actors[1].actor_name}, and ${
        props.scene.actors.length - 2
      } others!`;
    }
  }

  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2">Edit Performer:</Typography>

        <Typography variant="h2" sx={styles.bigTextWithSpacing}>
          {props.scene.scene_name}
        </Typography>
      </Placard>
      <div style={styles.imageContainer}>
        <img
          src={
            props.scene.actors.length > 0
              ? getDefaultAnimationToDisplay(props.scene.actors[0])
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          style={styles.image}
          alt={`Preview for scene "${props.scene.scene_name}"`}
        />
      </div>
      <Paper sx={styles.placard}>
        <Typography variant="h6">{actorsPreview}</Typography>
      </Paper>
      <Button
        onClick={redirectToEditScene}
        variant="contaioned"
        color="primary"
      >
        Edit details
      </Button>
    </BigLeftCard>
  );
};

export default EditPerformerView;
