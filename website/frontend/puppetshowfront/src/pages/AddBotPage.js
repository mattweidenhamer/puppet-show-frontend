import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import { Typography, Paper, Button } from "@mui/material";
import external_urls from "../external_urls";
import NavigationBar from "../components/NavBar/NavigationBar";

const styles = {
  sceneDisplayPaper: {
    paddingTop: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
};

const AddBotPage = (props) => {
  //TODO at some point, the user should be pulled from the current active user
  const user = {
    username: "Nill",
    discriminator: "6672",
    connection_id: "1234567890",
    banner_color: "#d1df58",
  };
  return (
    <MainLayout padding={2} user={user}>
      <NavigationBar />
      <Paper sx={styles.sceneDisplayPaper}>
        <Typography variant="h4">
          Awesome! You're logged in as:
          <Typography
            variant="h2"
            sx={{ color: user.banner_color, borderColor: "black" }}
          >
            {user.username}#{user.discriminator}
          </Typography>
        </Typography>
        <Typography variant="h5">Next, add our bot to your server!</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          href={external_urls.bot_invitation}
        >
          Invite the Puppetmaster!
        </Button>
      </Paper>
    </MainLayout>
  );
};

export default AddBotPage;
