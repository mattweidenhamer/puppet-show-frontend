// TODO Four panels here
// Top left: Manage scenes (and display active scene)
// Top right: Manage performers
// Bottom left: Invite bot
// Bottom right: User profile

import MainLayout from "../../components/Layout/MainLayout";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import debug_redirects from "../../constants/debug_redirects.json";
import getScenePreviewImage from "../../functions/misc/getScenePreviewImage";

const styles = {
  dashboardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "98%",
    height: "90%",
    alignItems: "center",
    padding: 1,
  },
  previewImageContainer: {
    width: 250,
    height: "75%",
    //borderRadius: "50%", //Uncomment for rounded circle
    border: `2px solid black`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewImageContainerAvatar: {
    width: 250,
    height: "75%",
    borderRadius: "50%", //Uncomment for rounded circle
    border: `2px solid black`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  button: {
    margin: 1,
  },
};
const DashboardPage = () => {
  const redirect = useNavigate();
  const active_scene = useRouteLoaderData("dashboard")["active_scene"];
  const user = JSON.parse(localStorage.getItem("user"));
  let active_scene_name = "None";
  console.log("active scene is ", active_scene);
  let active_scene_icon =
    "https://www.pikpng.com/pngl/m/202-2022667_red-cancel-delete-no-forbidden-prohibited-stop-sign.png";
  if (active_scene !== null) {
    active_scene_name = active_scene["scene_name"];
    if (
      active_scene["preview_icon"] !== null &&
      active_scene["preview_icon"] !== undefined
    ) {
      active_scene_icon = active_scene["preview_icon"];
    }
    //set the active scene icon to an animation from the scene.
    for (const outfit of active_scene["outfits"]) {
      if (
        outfit["preview_icon"] !== null &&
        outfit["preview_icon"] !== undefined
      ) {
        active_scene_icon = outfit["preview_icon"];
        break;
      }
    }
  }
  const inviteBotHandler = () => {
    window.open(debug_redirects.INVITE_BOT, "_blank");
  };
  return (
    <MainLayout>
      <NavigationBar />
      {/* <Placard sx={{ padding: 1, margin: 1 }}>
                <Typography variant="h6">Your Dashboard</Typography>
            </Placard> */}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.dashboardContainer}>
              <Typography variant="h6">Active Scene:</Typography>
              <Typography variant="body1">{active_scene_name}</Typography>
              <div style={styles.previewImageContainer}>
                <img
                  src={getScenePreviewImage(active_scene)}
                  style={styles.previewImage}
                  alt="scene preview"
                />
              </div>
              <br />
              <Button
                variant="contained"
                color="primary"
                href="/scenes"
                sx={styles.button}
              >
                Manage scenes
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.dashboardContainer}>
              <Typography variant="h6">Manage Performers</Typography>
              <Typography variant="body1">
                You currently have {user.added_performers_count} performers.
                <br />
                Performers are the users that are actually bound to the bot.
                <br />
                Each performer has a unique link that leads to their "stage."
                <br />
                This link is what you should put as a browser source into your
                stream software.
                <br />
              </Typography>
              <br />
              <Button variant="contained" href="/performers" sx={styles.button}>
                Manage performers
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.dashboardContainer}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Invite Bot
              </Typography>
              <Typography variant="body1">
                Invite the bot to your server so that you can start broadcasting
                your shows!
                <br />
                The bot must be in the same voice call as you in order for your
                performers to animate.
              </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={inviteBotHandler}
                sx={styles.button}
              >
                Invite bot
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.dashboardContainer}>
              <Typography variant="h6">User</Typography>
              <Typography variant="body1">
                Currently logged in as{" "}
                {JSON.parse(localStorage.getItem("user"))["discord_username"]}
              </Typography>
              <div style={styles.previewImageContainerAvatar}>
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.discord_snowflake}/${user.discord_avatar}.png?size=64`}
                  style={styles.previewImage}
                  alt="user avatar"
                />
              </div>
              <br />
              <Button variant="contained" href="/user" sx={styles.button}>
                Go to user page
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
