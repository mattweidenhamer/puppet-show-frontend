import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import NavigationBar from "../components/NavBar/NavigationBar";
import {
  CardContent,
  Grid,
  Card,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import AddSceneView from "../components/SpecificViews/AddSceneView";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import ActiveSceneView from "../components/SpecificViews/ActiveSceneView";
import AddObjectCard from "../components/Manipulation/AddObjectCard";
import getDefaultAnimationToDisplay from "../functions/misc/getDefaultAnimationToDisplay";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const styles = {
  paper: {
    padding: 2,
    margin: "auto",
    maxWidth: 600,
    alignItems: "center",
  },
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  card: {
    height: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  bigCard: {
    height: 2000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  previewImageContainer: {
    width: "150px",
    height: "150px",
    //borderRadius: "50%", //Uncomment for rounded circle
    border: `2px solid red`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "scale-down",
  },
  bigTextWithSpacing: {
    marginTop: 2,
  },
  buttonPadding: {
    marginBottom: 2,
  },
  topText: {
    marginTop: 2,
  },
  // GOD I LOATHE CSS
};

const ListScenePage = (props) => {
  // This page consists of two items: A navigation bar and a main content area.
  // The navigation bar is very simple: It just needs a back arrow, a "Home" button, and an avatar in the upper right corner that redirects to the user's page.
  // The main content area should be a grid of two cards.
  // The first one on the left should be a card. On it, the current scene should be displayed in large letters.
  // The second one on the right should be a grid of smaller cards. The first card should be a button that says "Add Scene".
  // All other cards should be different scenes, which display the scene name, one of the scene's actor images, and below that, two buttons: one that says "create scene" and one that says "edit scene."

  const [activeScene, setActiveScene] = React.useState(null);
  const [addSceneOn, setAddSceneOn] = React.useState(false);
  const [scenes, setScenes] = React.useState(useRouteLoaderData("allScenes"));
  const navigate = useNavigate();
  const editSceneHandler = (identifier) => {
    navigate(`${identifier}`);
  };
  const createSceneHandler = () => {
    setAddSceneOn(true);
  };
  const selectSceneHandler = (sceneIdentifier) => {
    setAddSceneOn(false);
    setActiveScene(scenes[sceneIdentifier]);
  };
  //TODO move to its own file
  let scenesList = [];
  for (let sceneId in scenes) {
    scenesList.push(scenes[sceneId]);
  }
  const sceneCards = scenesList.map((scene) => (
    <Card key={scene.scene_name} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {scene.scene_name}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={
            scene.actors.length > 0
              ? getDefaultAnimationToDisplay(scene.actors[0])
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          alt={scene.identifier}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <IconButton
          onClick={() => {
            editSceneHandler(scene.identifier);
          }}
          id={scene.identifier}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => selectSceneHandler(scene.identifier)}>
          {activeScene === scene ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  ));

  return (
    <MainLayout padding={2}>
      <NavigationBar backArrow />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {addSceneOn ? (
              <AddSceneView />
            ) : (
              <ActiveSceneView scene={activeScene} sx={styles.bigCard} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <div sx={styles.cardGrid}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <AddObjectCard
                    objName="Scene"
                    onClickHandler={createSceneHandler}
                    key="addScene"
                    sx={styles.card}
                  />
                </Grid>
                {sceneCards.map((card) => (
                  <Grid item key={card.key} xs={12} sm={6} md={4}>
                    {card}
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default ListScenePage;
