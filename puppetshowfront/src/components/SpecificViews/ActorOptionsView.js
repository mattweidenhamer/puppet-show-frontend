import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import PerformerOptionsView from "./PerformerOptionsView";

const styles = {
  optionsPlacard: {
    marginTop: 2,
  },
  form: {
    margin: 2,
  },
};

const ActorOptionsView = (props) => {
  const [outfit, setOutfit] = React.useState(props.outfit);

  const changeAffected = () => {
    const outfitName = document.getElementById("outfit_name").value;
    const newOutfit = { ...outfit, outfit_name: outfitName };
    props.updateOutfit(newOutfit);
    setOutfit(newOutfit);
  };
  const nameInput = (
    <TextField
      id="outfit_name"
      defaultValue={outfit.outfit_name}
      label="Outfit Name"
    ></TextField>
  );

  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2"> Edit {outfit.outfit_name} </Typography>
      </Placard>
      <Placard sx={styles.optionsPlacard}>
        <Typography variant="h5">
          Outfit for performer {props.performer.discord_username}
        </Typography>
        <Typography variant="h5">
          View, modify, or upload new animations by clicking them on the right.
        </Typography>

        <FormGroup sx={styles.form}>{nameInput}</FormGroup>
        <Button variant="contained" onClick={changeAffected}>
          Save
        </Button>
      </Placard>
    </BigLeftCard>
  );
};
export default ActorOptionsView;
