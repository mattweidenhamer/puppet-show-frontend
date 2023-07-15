import React from "react";
import {
  CardContent,
  Grid,
  Card,
  Typography,
  IconButton,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import AddObjectCard from "../components/Manipulation/AddObjectCard";
import DeleteIcon from "@mui/icons-material/Delete";
import MainLayout from "../components/Layout/MainLayout";
import NavigationBar from "../components/NavBar/NavigationBar";
import SceneOptionsView from "../components/SpecificViews/SceneOptionsView";
import AddActorView from "../components/SpecificViews/AddActorView";
import DeleteOutfitView from "../components/SpecificViews/DeleteOutfitView";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import addNewOutfit from "../functions/setters/outfits/addNewOutfit";
import deleteOutfit from "../functions/deleters/outfit/deleteOutfit";
import updateScene from "../functions/patchers/scene/updateScene";

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

const SpecificScenePage = (props) => {
  // This page consists of two items: A navigation bar and a main content area.
  // The navigation bar is an imported element. The back button on it should bring it back to the previous page.
  // The main content area should be a grid of two cards.
  // The first one on the left should be a single large card. On it, information and configuration information should be displayed.
  // The second one on the right should be a grid of smaller cards. The first card should be a button that says "Add Actor".
  // All other cards should display actors in the scene, including their username, discord ID, and their speaking avatar.
  // They should also include a button at the bottom of them that navigattes to the actor's invidiual configuration page, and a delete button.

  //Left box state should be one of three values, "Add" for adding new actors, "View" for viewing scene settings, and "Delete" for confirming delete of an actor.
  const [leftBoxState, setLeftBoxState] = React.useState("View");
  const [scene, setScene] = React.useState(
    useRouteLoaderData("specificScene").scene
  );
  const [selectedOutfit, selectOutfit] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const [performers, setPerformers] = React.useState(
    useRouteLoaderData("specificScene").performers
  );

  const navigate = useNavigate();

  const closeSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  const saveChanges = async (settings) => {
    //TODO save changes to scene and then put scene.
    const token = localStorage.getItem("token");
    const updatedScene = await updateScene(token, scene.identifier, settings);
    setScene(updatedScene);
    setSnackbarMessage(`Saved changes to scene ${scene.scene_name}`);
    setSeverity("success");
    setOpenSnackbar(true);
  };
  const getAnimationForOutfit = (outfit) => {
    if (outfit.animations.length > 0) {
      return outfit.animations[0].animation_path;
    } else {
      return getFailsafeAnimation(outfit.performer);
    }
  };

  const toggleDeleteOutfitHandler = (identifier) => {
    selectOutfit(
      scene.outfits.find((outfit) => outfit.identifier === identifier)
    );
    setLeftBoxState("Delete");
  };
  const createOutfitHandler = () => {
    setLeftBoxState("Add");
  };

  const getFailsafeAnimation = (performerId) => {
    const performer = performers.find(
      (performer) => performer.identifier === performerId
    );
    return "https://" + performer.discord_avatar;
  };

  const handleDeleteOutfit = async (outfit) => {
    const token = localStorage.getItem("token");
    await deleteOutfit(token, scene.identifier, outfit.identifier);

    setSnackbarMessage(
      `Deleted outfit ${outfit.outfit_name} from scene ${scene.scene_name}`
    );
    setSeverity("info");
    setOpenSnackbar(true);
    setLeftBoxState("View");
    setScene((prevState) => ({
      ...prevState,
      outfits: prevState.outfits.filter(
        (outfitInScene) => outfitInScene.identifier !== outfit.identifier
      ),
    }));
  };
  const checkPerformerHasOutfit = (performerId) => {
    return scene.outfits.some((outfit) => outfit.performer === performerId);
  };

  const handleCreateOutfit = async (performerId, outfitName, doRedirect) => {
    const token = localStorage.getItem("token");
    const newOutfit = await addNewOutfit(token, scene.identifier, {
      outfit_name: outfitName,
      performer_id: performerId,
    });
    if (doRedirect) {
      navigate(`/outfits/${newOutfit.identifier}`);
    }
    setScene((prevState) => ({
      ...prevState,
      outfits: [...prevState.outfits, newOutfit],
    }));
  };
  const outfitCards = scene.outfits.map((outfit) => (
    <Card key={outfit.outfit_name} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {outfit.outfit_name}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={getAnimationForOutfit(outfit)}
          alt={outfit.name}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <IconButton
          href={`/outfits/${outfit.identifier}`}
          id={outfit.identifier}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => toggleDeleteOutfitHandler(outfit.identifier)}
          id={outfit.identifier}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  ));

  let leftBox = <SceneOptionsView scene={scene} saveChanges={saveChanges} />;
  if (leftBoxState === "Add") {
    leftBox = (
      <AddActorView
        scene={scene}
        performers={performers}
        onCreateOutfit={handleCreateOutfit}
        checkPerformerHasOutfit={checkPerformerHasOutfit}
      />
    );
  } else if (leftBoxState === "Delete") {
    leftBox = (
      <DeleteOutfitView
        outfit={selectedOutfit}
        scene={scene}
        onDeleteConfirm={handleDeleteOutfit}
        image={getAnimationForOutfit(selectedOutfit)}
      />
    );
  }

  return (
    <MainLayout padding={2}>
      <NavigationBar backArrow={"/scenes"} />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {leftBox}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div sx={styles.cardGrid}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                  <AddObjectCard
                    objName="Outfit"
                    onClickHandler={createOutfitHandler}
                  />
                </Grid>
                {outfitCards.map((card) => (
                  <Grid item key={card.key} xs={12} sm={6} md={4}>
                    {card}
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default SpecificScenePage;
