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

const DeletePerformerView = (props) => {
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const performer = props.performer;
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2" color="warning.main">
          Really delete performer {performer.discord_username}?
        </Typography>
      </Placard>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={`https://${performer.discord_avatar}`}
          alt="Preview of deleted object"
        />
      </div>
      <Placard>
        <Typography variant="h5">
          Users without performers in scenes will not render. This will also
          delete all of their outfits in your scenes.
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
            props.onDeleteConfirm(performer.identifier);
          }}
        >
          Delete actor
        </Button>
      </Placard>
    </BigLeftCard>
  );
};

export default DeletePerformerView;
