import React from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
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
const getFailsafeAnimation = (performer) => {
  return "https://" + performer.discord_avatar;
};

const DeleteActorView = (props) => {
  console.log(props.outfit);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2" color="warning.main">
          Really delete actor {props.outfit.outfit_name} from scene{" "}
          {props.scene.scene_name}?
        </Typography>
      </Placard>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={props.image}
          alt="Preview of deleted object"
        />
      </div>
      <Placard>
        <Typography variant="h5">
          Users without actors in scenes will not render, even if they're
          configured in your linked users.
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
            props.onDeleteConfirm(props.outfit);
          }}
        >
          Delete actor
        </Button>
      </Placard>
    </BigLeftCard>
  );
};

export default DeleteActorView;
