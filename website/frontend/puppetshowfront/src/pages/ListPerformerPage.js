import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import NavigationBar from "../components/NavBar/NavigationBar";
import { useRouteLoaderData } from "react-router-dom";
import AddObjectCard from "../components/Manipulation/AddObjectCard";
import {
  CardContent,
  Grid,
  Card,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddPerformerView from "../components/SpecificViews/AddPerformerView";
import EditPerformerView from "../components/SpecificViews/EditPerformerView";
import PerformerOptionsView from "../components/SpecificViews/PerformerOptionsView";
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

const ListPerformerPage = () => {
  // This page consists of two main content areas below a navigation bar.
  // The first content area is single large card. This will be where performer settings are changed.
  // The second content area is a grid of cards. Each card will list a performer.
  // The first card should be a button that says "Add Performer".
  // The other cards should display performer names and a preview of their avatar.
  const [performers, setPerformers] = React.useState(
    useRouteLoaderData("allPerformers")
  );
  // If viewed performer is null, the add performer view is shown.
  const [viewedPerformer, setViewedPerformer] = React.useState(null);
  const editPerformerHandler = (performerId) => {
    setViewedPerformer(performerId);
  };
  const changeToNewPerformer = (performer) => {
    setPerformers((prevState) => [...prevState, performer]);
    setViewedPerformer(null);
  };
  console.log(performers);
  const onUpdatePerformer = async (performer) => {
    setPerformers((prevState) => {
      let newPerformerList = [...prevState];
      let index = newPerformerList.findIndex((element) => {
        return element.identifier === performer.identifier;
      });
      newPerformerList[index] = performer;
    });
    setViewedPerformer(null);
  };
  const performerCards = performers.map((performer) => (
    <Card key={performer.scene_name} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {performer.discord_username}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={
            performer.discord_avatar !== null
              ? `https://${performer.discord_avatar}`
              : "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png"
          }
          alt={performer.identifier}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <IconButton
          onClick={() => {
            editPerformerHandler(performer.identifier);
          }}
          id={performer.identifier}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  ));
  return (
    <MainLayout padding={2}>
      <NavigationBar backArrow />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          {viewedPerformer === null ? (
            <AddPerformerView onPerformerCreate={changeToNewPerformer} />
          ) : (
            <PerformerOptionsView
              performer={performers.find((element) => {
                return element.identifier === viewedPerformer;
              })}
              onUpdatePerformer={onUpdatePerformer}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <AddObjectCard
                objName="performer"
                // onClickHandler={createSceneHandler}
                key="addPerformer"
                sx={styles.card}
              />
            </Grid>
            {performerCards.map((card) => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                {card}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
export default ListPerformerPage;
