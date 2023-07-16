import React from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import getScenePreviewImage from "../../functions/misc/getScenePreviewImage";

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

const DeleteSceneView = (props) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2" color="warning.main">
          Really delete scene {props.scene.scene_name}
        </Typography>
        <Typography variant="h5" color="warning.secondary">
          Note that this will also delete any associated outfits!
        </Typography>
      </Placard>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={getScenePreviewImage(props.scene)}
          alt="Preview of deleted object"
        />
      </div>
      <Placard>
        <Typography variant="h5">
          Note that this will also delete any associated outfits!
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event) => {
                setConfirmDelete(event.target.checked);
              }}
            />
          }
          label="I understand!"
        />
        <Button
          variant="contained"
          disabled={!confirmDelete}
          color="error"
          onClick={() => {
            props.onDeleteConfirm(props.scene.identifier);
          }}
        >
          Delete scene
        </Button>
      </Placard>
    </BigLeftCard>
  );
};

export default DeleteSceneView;
