import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import NavigationBar from "../components/NavBar/NavigationBar";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  CardActions,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddObjectCard from "../components/Manipulation/AddObjectCard";
import scenes from "../constants/scene_test.json";
import ActorOptionsView from "../components/SpecificViews/ActorOptionsView";
import getDefaultAnimationToDisplay from "../functions/misc/getDefaultAnimationToDisplay";

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

const convertKeyToName = (key) => {
  return key.replace(/_/g, " ");
};

const SpecificActorPage = (props) => {
  // This page consists of three items: A navigation bar, a left content area, and a right content area.
  // The left content area is for the actor's specific information and settings.
  // If no animations have yet been set, it will also contain a message prompting the user to set some.
  // It will also provide the user's unique actor link that will allow them to pull up the specific actor.
  // The right content area is for the actor's animations.
  // They will be displayed in card format, an example of each one, and a title for what they depict.
  // They can also configure editing and uploading the animations here.
  // Not sure yet if the user will be uploading to the server or hosting them offsite.
  // For now use offsite, but reconsider once the server is up and running.
  // The navigation bar is an imported element. The back button on it should bring it back to the previous page.
  const [actor, setActor] = React.useState(scenes[1].actors[1]);
  const [leftBoxState, setLeftBoxState] = React.useState("Options");
  const [viewedAnimation, setViewedAnimation] = React.useState();

  const listOfKeys = Object.keys(actor.animations);

  const uploadNewAnimationHandler = (event) => {};

  const animationCards = listOfKeys.map((key) => (
    <Card key={key} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {convertKeyToName(key)}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={actor.animations[key] !== null ? actor.animations[key] : ""}
          alt={convertKeyToName(key)}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <IconButton onClick={uploadNewAnimationHandler} id={key}>
          <UploadFileIcon />
        </IconButton>
        <IconButton id={key + " button 2"}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  ));

  let leftBox = <ActorOptionsView actor={actor} />;
  if (leftBoxState === "Change") {
    leftBox = <AddObjectCard />;
  }
  //   if (leftBoxState === "Add") {
  //     leftBox = <AddActorView scene={scene} />;
  //   } else if (leftBoxState === "Delete") {
  //     leftBox = (
  //       <DeleteActorView
  //         actor={selectedActor}
  //         scene={scene}
  //         onDeleteConfirm={handleDeleteActor}
  //       />
  //     );
  //   }

  return (
    <MainLayout padding={2}>
      <NavigationBar backArrow />
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {leftBox}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div sx={styles.cardGrid}>
              <Grid container spacing={4}>
                {animationCards.map((card) => (
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

export default SpecificActorPage;
