// TODO Four panels here
// Top left: Manage scenes (and display active scene)
// Top right: Manage performers
// Bottom left: Invite bot
// Bottom right: User profile

import MainLayout from "../../components/Layout/MainLayout";
import NavigationBar from "../../components/NavBar/NavigationBar";
import Placard from "../../components/Display/Placard";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useRouteLoaderData } from "react-router-dom";

const styles = {
    dashboardContainer: {
        width: "100%",
        height: "230px",
        alignItems: "center",
    }
}
const DashboardPage = () => {
    const active_scene = useRouteLoaderData("dashboard")["active_scene"];
    let active_scene_name = "None";

    let active_scene_icon = "https://www.pikpng.com/pngl/m/202-2022667_red-cancel-delete-no-forbidden-prohibited-stop-sign.png";
    if (active_scene.status === 200) {
        active_scene_name = active_scene["scene_name"]
        active_scene_icon = active_scene["preview_icon"]
        //set the active scene icon to an animation from the scene.
    }
    const user = useRouteLoaderData("dashboard")["user"];

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
                            <Typography variant="h6">Manage Scenes</Typography>
                            <Typography variant="body1">Active Scene:<br />{active_scene_name}</Typography>
                            <img src={active_scene_icon} style={{ height: "60%", width: "30%" }} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={styles.dashboardContainer}>
                            <Typography variant="h6">Manage Performers</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={styles.dashboardContainer}>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={styles.dashboardContainer}>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </MainLayout>
    );
};

export default DashboardPage;