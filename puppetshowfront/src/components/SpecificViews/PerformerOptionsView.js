import BigLeftCard from "../Layout/BigLeftCard";
import Placard from "../Display/Placard";
import {
  FormGroup,
  Typography,
  FormControl,
  Button,
  TextField,
  Link,
} from "@mui/material";
import React, { useEffect } from "react";
import updatePerformerSettings from "../../functions/patchers/performers/updatePerformer";
import debug_redirects from "../../constants/debug_redirects.json";
import defaultAPICallbackGen from "../../functions/callbacks/defaultAPICallbackGen";
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
  const performer = props.performer;
  useEffect(() => {
    document.getElementById("discord-snowflake-input").value =
      performer.discord_snowflake;
    document.getElementById("pronouns-input").value =
      performer.settings.pronouns;
  }, [performer]);

  const changeAffected = async () => {
    const newSnowflake = document.getElementById(
      "discord-snowflake-input"
    ).value;
    const newSettings = {
      pronouns: document.getElementById("pronouns-input").value,
    };
    const newPerformer = await updatePerformerSettings(
      localStorage.getItem("token"),
      performer.identifier,
      {
        discord_snowflake: newSnowflake,
        settings: newSettings,
      },
      defaultAPICallbackGen(props.toaster)
    );
    props.onUpdatePerformer(newPerformer);
    //TODO change some part of the scene based on the toggle.
  };
  const openStageInNewWindow = (link) => {};
  const link =
    debug_redirects.THIS_URL +
    debug_redirects.THIS_STAGE_EXTENSION +
    performer.identifier;
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
        <Typography variant="body1">Your performer's stage:</Typography>
        <Link
          //href={link}
          underline="hover"
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          {link}
        </Link>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
          sx={{ marginTop: 2 }}
        >
          Copy Link to Clipboard
        </Button>
      </Placard>
      <Placard sx={styles.optionsPlacard}>
        <Typography variant="h6">
          These settings will apply across all outfits.
        </Typography>
        <FormGroup sx={styles.form}>
          {EditDiscordSnowflake}
          {EditPronouns}
        </FormGroup>
        <Button
          variant="contained"
          onClick={changeAffected}
          sx={{ marginTop: 2 }}
        >
          Save
        </Button>
      </Placard>
    </BigLeftCard>
  );
};
export default PerformerOptionsView;
