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
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ActiveSceneView from "../components/SpecificViews/ActiveSceneView";
import scenes from "../testdata/scene_test.json";
import "./ScenePage.css";

const styles = {
  paper: {
    padding: 2,
    margin: "auto",
    maxWidth: 600,
  },
  cardGrid: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  card: {
    height: 327,
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

const ScenePage = (props) => {
  // This page consists of two items: A navigation bar and a main content area.
  // The navigation bar is very simple: It just needs a back arrow, a "Home" button, and an avatar in the upper right corner that redirects to the user's page.
  // The main content area should be a grid of two cards.
  // The first one on the left should be a card. On it, the current scene should be displayed in large letters.
  // The second one on the right should be a grid of smaller cards. The first card should be a button that says "Add Scene".
  // All other cards should be different scenes, which display the scene name, one of the scene's actor images, and below that, two buttons: one that says "create scene" and one that says "edit scene."

  const [activeScene, setActiveScene] = React.useState(null);

  const editSceneHandler = (event) => {
    //TODO  navigate to scene's individual edit page
    console.log(`Edit scene ${event.target.id}`);
  };
  const createSceneHandler = (event) => {
    //TODO navigate to a create scene page
    console.log("Create scene");
  };
  const selectSceneHandler = (sceneIdentifier) => {
    setActiveScene(
      scenes.find((scene) => scene.identifier === sceneIdentifier)
    );
  };
  // //TODO move to its own file
  // Add scene card
  const addSceneCard = (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h5">Add scene</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={createSceneHandler}>
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  //TODO move to its own file
  const sceneCards = scenes.map((scene) => (
    <Card key={scene.sceneName} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {scene.sceneName}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={
            scene.actors.length > 0
              ? scene.actors[0].speakingAnimation
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          alt={scene.identifier}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <IconButton onClick={editSceneHandler} id={scene.identifier}>
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
          <Grid item xs={12} sm={6}>
            <ActiveSceneView scene={activeScene} sx={styles.b} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div sx={styles.cardGrid}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  {addSceneCard}
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

export default ScenePage;
