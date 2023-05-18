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
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddPerformerView from "../components/SpecificViews/AddPerformerView";
import PerformerOptionsView from "../components/SpecificViews/PerformerOptionsView";
import DeletePerformerView from "../components/SpecificViews/DeletePerformerView";
import deletePerformer from "../functions/deleters/performers/deletePerformer";
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
    borderRadius: "50%", //Uncomment for rounded circle
    border: `1px solid black`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 1,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    // objectFit: "scale-down",
  },
  bigTextWithSpacing: {
    marginTop: 2,
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
  const [deletionToggle, setDeletionToggle] = React.useState(false);
  const editPerformerHandler = (performerId) => {
    setViewedPerformer(performerId);
    setDeletionToggle(false);
  };
  const addPerformerHandler = () => {
    setViewedPerformer(null);
  };
  const changeToNewPerformer = (performer) => {
    setPerformers((prevState) => [...prevState, performer]);
    setViewedPerformer(null);
  };
  const toggleDeletePerformerHandler = (performerId) => {
    setDeletionToggle(true);
    setViewedPerformer(performerId);
  };
  const onDeletePerformer = async (performerId) => {
    deletePerformer(localStorage.getItem("token"), performerId);
    setPerformers((prevState) => {
      let newPerformerList = [...prevState];
      let index = newPerformerList.findIndex((element) => {
        return element.identifier === performerId;
      });
      newPerformerList.splice(index, 1);
      return newPerformerList;
    });
    setViewedPerformer(null);
    setDeletionToggle(false);
  };
  const onUpdatePerformer = async (performer) => {
    setPerformers((prevState) => {
      let newPerformerList = [...prevState];
      let index = newPerformerList.findIndex((element) => {
        return element.identifier === performer.identifier;
      });
      newPerformerList[index] = performer;
      return newPerformerList;
    });
    setViewedPerformer(null);
  };
  const performerCards = performers.map((performer) => (
    <Card key={performer.discord_username} sx={styles.card}>
      <CardContent>
        <Paper>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={styles.topText}
          >
            {performer.discord_username}
          </Typography>
        </Paper>
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
      <Paper>
        <CardActions sx={styles.buttonPadding}>
          <IconButton
            onClick={() => {
              editPerformerHandler(performer.identifier);
            }}
            id={performer.identifier}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              toggleDeletePerformerHandler(performer.identifier);
            }}
            id={performer.identifier}
          >
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Paper>
    </Card>
  ));

  let leftCard = <AddPerformerView onPerformerCreate={changeToNewPerformer} />;
  if (viewedPerformer !== null) {
    if (deletionToggle) {
      leftCard = (
        <DeletePerformerView
          performer={performers.find((element) => {
            return element.identifier === viewedPerformer;
          })}
          onDeleteConfirm={onDeletePerformer}
        />
      );
    } else {
      leftCard = (
        <PerformerOptionsView
          performer={performers.find((element) => {
            return element.identifier === viewedPerformer;
          })}
          onUpdatePerformer={onUpdatePerformer}
        />
      );
    }
  }

  return (
    <MainLayout padding={2}>
      <NavigationBar backArrow />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          {leftCard}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <AddObjectCard
                objName="performer"
                onClickHandler={addPerformerHandler}
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
