import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NavigationBar = (props) => {
  // This component should be a simple navigation bar that has a back arrow, a "Home" button, and an avatar in the upper right corner that redirects to the user's page.
  // The back arrow should be a button that redirects to the previous page, as dictated by a prop.
  // The "Home" button should be a button that redirects to the home page.
  // The icon for the avatar should be the icon of the currently logged in user.
  const navigate = useNavigate();
  const handleBackButton = (redirect) => {
    navigate(redirect);
  };
  const handleHomeButton = () => {
    navigate("/");
  };
  const handleGoToUserPage = () => {
    navigate("/user");
  };
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };
  const handleGoToHelp = () => {
    navigate("/help");
  };
  let avatar = (
    <Button
      href="/connectDiscord"
      variant="contained"
      sx={{ color: "secondary", alignSelf: "center" }}
      disableElevation
    >
      Connect your Discord!
    </Button>
  );
  if (localStorage.getItem("user") !== null) {
    avatar = (
      <Avatar
        sx={{ bgcolor: "secondary.main", alignSelf: "center" }}
        onClick={handleGoToUserPage}
        src={`https://cdn.discordapp.com/avatars/${
          JSON.parse(localStorage.getItem("user")).discord_snowflake
        }/${
          JSON.parse(localStorage.getItem("user")).discord_avatar
        }.png?size=64`}
      />
    );
  }
  let backArrow;
  if (props.backArrow) {
    backArrow = (
      <IconButton
        size="large"
        color="inherit"
        aria-label="menu"
        edge="start"
        onClick={() => {
          handleBackButton(props.backArrow);
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleHomeButton}
          >
            <HomeIcon />
          </IconButton>
          <Button color="inherit" onClick={handleGoToDashboard} sx={{ mr: 2 }}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={handleGoToHelp} sx={{ mr: 2 }}>
            How to use
          </Button>
          {backArrow}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puppet Show
          </Typography> */}
          <div>{avatar}</div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
