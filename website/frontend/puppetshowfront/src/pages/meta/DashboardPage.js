// TODO Four panels here
// Top left: Manage scenes (and display active scene)
// Top right: Manage performers
// Bottom left: Invite bot
// Bottom right: User profile

import MainLayout from "../../components/Layout/MainLayout";
import NavigationBar from "../../components/NavBar/NavigationBar";
import Placard from "../../components/Display/Placard";
import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const styles = {
  dashboardContainer: {
    width: "98%",
    height: "90%",
    alignItems: "center",
    padding: 1,
  },
};
const DashboardPage = () => {
  const redirect = useNavigate();
  const active_scene = useRouteLoaderData("dashboard")["active_scene"];
  const user = JSON.parse(localStorage.getItem("user"));
  let active_scene_name = "None";

  let active_scene_icon =
    "https://www.pikpng.com/pngl/m/202-2022667_red-cancel-delete-no-forbidden-prohibited-stop-sign.png";
  if (active_scene !== null) {
    active_scene_name = active_scene["scene_name"];
    active_scene_icon = active_scene["preview_icon"];
    //set the active scene icon to an animation from the scene.
  }
  const redirectToScenes = () => {
    redirect("/scenes/");
  };
  const redirectToBot = () => {
    redirect("/bot");
  };
  const redirectToUser = () => {
    redirect("/user");
  };
  const redirectToPerformers = () => {
    redirect("/performers");
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
              <img
                src={active_scene_icon}
                style={{ height: "60%", width: "30%", margin: "2%" }}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={redirectToScenes}
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
                This link is what you should put into your OBS browser source.
                <br />
              </Typography>
              <br />
              <Button variant="contained" onClick={redirectToPerformers}>
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
              </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={redirectToBot}
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
              <img
                src={`https://cdn.discordapp.com/avatars/${user.discord_snowflake}/${user.discord_avatar}.png?size=64`}
                style={{
                  height: "60%",
                  width: "30%",
                  margin: "2%",
                  borderRadius: "50%",
                }}
              />
              <br />
              <Button variant="contained" onClick={redirectToUser}>
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
