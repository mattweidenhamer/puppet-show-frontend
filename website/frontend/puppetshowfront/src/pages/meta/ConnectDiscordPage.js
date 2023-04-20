import React from "react";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { Button, Link, Paper, Typography } from "@mui/material";
import MainLayout from "../../components/Layout/MainLayout";
import auth_urls from "../../constants/auth_urls";
const styles = {
  addDisplayPaper: {
    paddingTop: 10,
  },
};

const ConnectDiscordPage = () => {
  console.log(auth_urls);
  return (
    <MainLayout padding={2}>
      <NavigationBar />
      <Paper sx={styles.addDisplayPaper}>
        <Typography variant="h2" gutterBottom>
          First, connect your Discord account!
        </Typography>
        <Typography variant="h5">
          Puppet Show needs access to your Discord in order to detect your voice
          state.
          <br />
          Click the button below to connect your Discord account.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 15, marginBottom: 25 }}
          href={auth_urls.DISCORD_OAUTH_URL}
        >
          Connect Discord
        </Button>
        <div />
        <Typography variant="p" gutterBottom>
          Curious about what we do with your data? Head over to our{" "}
          <Link href="/importantInformation">page about what we collect</Link>,
          or examine our code yourself on{" "}
          <Link href="https://github.com/mattweidenhamer/Puppet-Show">
            our Github.
          </Link>
          <br />
          <b>Absolutely nothing is, or ever will be, shared or sold.</b>
          <br />
          We hope we provide a welcome respite from the rest of the internet in
          that regard.
        </Typography>
      </Paper>
    </MainLayout>
  );
};

export default ConnectDiscordPage;
