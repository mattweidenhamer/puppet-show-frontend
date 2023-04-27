import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { Typography, Paper, Button } from "@mui/material";
import NavigationBar from "../../components/NavBar/NavigationBar";

const styles = {
  sceneDisplayPaper: {
    paddingTop: 20,
    paddingBottom: 24,
  },
};

const getStartedPage = () => {
  return (
    <MainLayout padding={2}>
      <NavigationBar />
      <Paper sx={styles.sceneDisplayPaper}>
        <Typography variant="h2">Awesome!</Typography>
        <Typography variant="h4">
          You're all set! <br />
          Scroll down to see how you can start PNGTubing with Puppetshow!
        </Typography>
        <Typography variant="h5">
          Or, if you already know how to use puppetshow:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          href="/dashboard"
        >
          Click here!
        </Button>
      </Paper>
    </MainLayout>
  );
};
export default getStartedPage;
