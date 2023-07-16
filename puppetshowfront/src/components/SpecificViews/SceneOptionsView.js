import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import {
  FormGroup,
  Typography,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const styles = {
  optionsPlacard: {
    marginTop: 2,
  },
  form: {
    margin: 2,
  },
  saveButton: {
    marginTop: 2,
  },
};

const changeAffeced = async () => {
  const newName = document.getElementById("scene-name-changer").value;
  //TODO when settings are implemented, change them here.
};

const SceneOptionsView = (props) => {
  const [scene, setScene] = useState(props.scene);
  useEffect(() => {
    document.getElementById("scene-name-changer").value = scene.scene_name;
  }, [scene]);

  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2"> Edit Scene "{scene.scene_name}" </Typography>
      </Placard>
      <Placard sx={styles.optionsPlacard}>
        <Typography variant="h5">
          View or add new outfits by using the cards to the right.
        </Typography>
        <FormGroup sx={styles.form}>
          <FormControl>
            <TextField id="scene-name-changer" label="Scene Name" />
          </FormControl>
        </FormGroup>
        <Button
          sx={styles.saveButton}
          onClick={() => {
            props.saveChanges(changeAffeced());
          }}
          variant="contained"
        >
          Save changes
        </Button>
      </Placard>
    </BigLeftCard>
  );
};
export default SceneOptionsView;
