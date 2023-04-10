import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import { Typography, Paper, Button } from "@mui/material";

const styles = {
  sceneDisplayPaper: {
    paddingTop: 20,
    paddingBottom: 24,
  },
};

const LandingPage = (props) => {
  return (
    <MainLayout padding={2}>
      <Paper sx={styles.sceneDisplayPaper}>
        <Typography variant="h2">Puppet Show</Typography>
        <Typography variant="h3">By Matthew Weidenhamer</Typography>
        <Typography variant="h6">
          Puppet Show is a web-based client for Discord PNGTubing
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 20 }}>
          Get Started
        </Button>
      </Paper>
    </MainLayout>
  );
};

export default LandingPage;
