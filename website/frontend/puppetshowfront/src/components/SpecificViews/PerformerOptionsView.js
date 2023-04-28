import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import {
  FormGroup,
  Typography,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import updatePerformerSettings from "../../functions/patchers/performers/updatePerformerSettings";

const styles = {
  optionsPlacard: {
    marginTop: 2,
  },
  form: {},
  formInput: {
    marginTop: 2,
  },
};

const PerformerOptionsView = (props) => {
  const [performer, setPerformer] = React.useState(props.performer);

  const changeAffected = async (event) => {
    const newSettings = {
      pronouns: document.getElementById("pronouns-input").value,
    };
    const newPerformer = await updatePerformerSettings(
      localStorage.getItem("token"),
      performer.identifier,
      newSettings
    );
    setPerformer(newPerformer);
    props.onUpdatePerformer(newPerformer);
    //TODO change some part of the scene based on the toggle.
  };
  const EditDiscordSnowflake = (
    <FormControl>
      <TextField
        id="discord-snowflake-input"
        defaultValue={performer.discord_snowflake}
        label="Discord Snowflake"
        placeholder="Discord Snowflake"
        variant="outlined"
        color="primary"
        sx={styles.formInput}
      />
    </FormControl>
  );
  const EditPronouns = (
    <FormControl>
      <TextField
        id="pronouns-input"
        label="Pronouns"
        defaultValue={performer.settings.pronouns}
        placeholder="Pronouns"
        variant="outlined"
        color="primary"
        sx={styles.formInput}
      />
    </FormControl>
  );
  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2">
          {" "}
          Edit {performer.discord_username}{" "}
        </Typography>
      </Placard>
      <Placard sx={styles.optionsPlacard}>
        <Typography variant="h5">
          These settings will apply across all outfits.
        </Typography>
        <FormGroup sx={styles.form}>
          {EditDiscordSnowflake}
          {EditPronouns}
        </FormGroup>
        <Button variant="contained" onClick={changeAffected}>
          Save
        </Button>
      </Placard>
    </BigLeftCard>
  );
};
export default PerformerOptionsView;
