import React from "react";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { Button, Link, Paper, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";
import Placard from "../../components/Display/Placard";
const styles = {
  addDisplayPaper: {
    minHeight: "75vh",
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  disclaimer: {
    alignSelf: "end",
  },
};

const ConnectDiscordPage = () => {
  console.log(process.env.REACT_APP_DISCORD_OAUTH_URL);
  return (
    <MainLayout padding={2}>
      <NavigationBar />
      <Paper sx={styles.addDisplayPaper}>
        <Placard>
          <Typography variant="h2" gutterBottom>
            First, connect your Discord account!
          </Typography>
          <Typography variant="h5">
            Puppet Show needs access to your Discord in order to detect your
            voice state.
            <br />
            Click the button below to connect your Discord account.
          </Typography>
        </Placard>
        <Button
          variant="contained"
          color="primary"
          href={process.env.REACT_APP_DISCORD_OAUTH_URL}
          sx={styles.button}
        >
          Connect Discord
        </Button>
        <div />
        <Placard>
          <Typography variant="p" gutterBottom sx={styles.disclaimer}>
            Curious about what we do with your data? Head over to our{" "}
            <Link href="/importantInformation">page about what we collect</Link>
            , or examine our code yourself on{" "}
            <Link href="https://github.com/mattweidenhamer/Puppet-Show">
              our Github.
            </Link>
            <br />
            <b>Absolutely nothing is, or ever will be, shared or sold.</b>
            <br />
            We hope we provide a welcome respite from the rest of the internet
            in that regard.
          </Typography>
        </Placard>
      </Paper>
    </MainLayout>
  );
};

export default ConnectDiscordPage;
