import { Paper } from "@mui/material";
import React from "react";
const styles = {
  placard: {
    padding: 3,
    margin: 2,
  },
};

const Placard = (props) => {
  return (
    <Paper sx={{ ...styles.placard, ...props.sx }}>{props.children}</Paper>
  );
};
export default Placard;
