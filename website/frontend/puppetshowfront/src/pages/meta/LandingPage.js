import React from "react";
import MainLayout from "../../components/Layout/MainLayout";
import { Typography, Paper, Button } from "@mui/material";
import NavigationBar from "../../components/NavBar/NavigationBar";

const styles = {
  sceneDisplayPaper: {
    // Use if we keep navigation bar
    // minHeight: "75vh",
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  getStartedButton: {
    marginTop: 10,
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  landingImageContainer: {
    width: 250,
    height: 250,
    borderRadius: "50%", //Uncomment for rounded circle
    border: `2px solid black`,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
    margin: 1,
  },
  landingImage: {
    width: "100%",
    height: "100%",
  },
};

const LandingPage = (props) => {
  let redirectLink = "/dashboard";
  let buttonText = "Go to Dashboard";
  if (localStorage.getItem("token") === null) {
    redirectLink = "/connectDiscord";
    buttonText = "Get Started!";
  }
  return (
    <MainLayout padding={2}>
      {/* <NavigationBar /> */}
      <Paper sx={styles.sceneDisplayPaper}>
        <div style={styles.landingImageContainer}>
          <img
            src={process.env.PUBLIC_URL + "/static/PuppetShowAvatar.png"}
            alt="Puppet Show Logo"
            style={styles.landingImage}
          />
        </div>
        <Typography variant="h2">Puppet Show</Typography>
        <Typography variant="h3">By Matthew Weidenhamer</Typography>
        <Typography variant="h6">
          Puppet Show is a web-based client for PNGTubing on all your favorite
          streaming sites.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.getStartedButton}
          href={redirectLink}
        >
          {buttonText}
        </Button>
      </Paper>
    </MainLayout>
  );
};

export default LandingPage;
