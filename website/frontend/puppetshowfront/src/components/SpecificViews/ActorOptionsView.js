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
} from "@mui/material";
import React from "react";

const styles = {
  optionsPlacard: {
    marginTop: 2,
  },
  form: {},
};

const ActorOptionsView = (props) => {
  const [actor, setActor] = React.useState(props.actor);

  const changeAffected = (event) => {
    //TODO change some part of the scene based on the toggle.
  };
  const switchExample = (
    <FormControl>
      <FormControlLabel
        control={
          <Switch color="primary" onChange={changeAffected} defaultChecked />
        }
        label="Example toggle"
        id="example-switch-1"
      />
      <FormControlLabel
        control={<Switch color="primary" onChange={changeAffected} />}
        label="Example toggle 2"
        id="example-switch-2"
      />
    </FormControl>
  );
  const radioExample = (
    <FormControl>
      <FormLabel id="example-radio-label">Example radio selector.</FormLabel>
      <RadioGroup row defaultValue="1" name="Example radio">
        <FormControlLabel value="1" control={<Radio />} label="Test option 1" />
        <FormControlLabel value="2" control={<Radio />} label="Test option 2" />
        <FormControlLabel value="3" control={<Radio />} label="Test option 3" />
        <FormControlLabel value="4" control={<Radio />} label="Test option 4" />
      </RadioGroup>
    </FormControl>
  );
  const checkboxExample = (
    <FormControl>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Example checkbox"
      />
      <FormControlLabel control={<Checkbox />} label="Example checkbox 2" />
      <FormControlLabel control={<Checkbox />} label="Example checkbox 3" />
    </FormControl>
  );

  return (
    <BigLeftCard>
      <Placard>
        <Typography variant="h2"> Edit {actor.actor_name} </Typography>
      </Placard>
      <Placard sx={styles.optionsPlacard}>
        <Typography variant="h5">
          View, modify, or upload new animations by clicking them on the right.
        </Typography>
        <FormGroup sx={styles.form}>
          {switchExample}
          {radioExample}
          {checkboxExample}
        </FormGroup>
        <Button variant="contained" onClick={changeAffected}>
          Save
        </Button>
      </Placard>
    </BigLeftCard>
  );
};
export default ActorOptionsView;
