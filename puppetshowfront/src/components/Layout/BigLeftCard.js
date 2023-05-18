import React from "react";
import { Typography, Paper, Button, input, IconButton } from "@mui/material";

const styles = {
  paper: {
    alignItems: "center",
    blockSize: 719,
    padding: 2,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
};

const BigLeftCard = (props) => {
  return <Paper sx={{ ...styles.paper, ...props.sx }}>{props.children}</Paper>;
};

export default BigLeftCard;
