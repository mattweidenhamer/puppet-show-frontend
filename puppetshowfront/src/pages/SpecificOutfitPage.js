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
  Tooltip,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ActorOptionsView from "../components/SpecificViews/ActorOptionsView";
import { useRouteLoaderData } from "react-router-dom";
import updateOutfit from "../functions/patchers/outfit/updateOutfit";
import deleteAnimation from "../functions/deleters/animations/deleteAnimation";
import UploadAnimationView from "../components/SpecificViews/UploadAnimationView";
import addNewAnimation from "../functions/setters/animations/addNewAnimation";

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

const animationTypes = [
  "START_SPEAKING",
  "NOT_SPEAKING",
  //"SLEEPING",
  //"CONNECTION",
  //"DISCONNECTION",
];
// const camelize = (str) => {
//   return str
//     .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//       return index === 0 ? word.toLowerCase() : word.toUpperCase();
//     })
//     .replace(/\s+/g, "");
// };
const READABLE_NAMES = {
  START_SPEAKING: "Speaking",
  NOT_SPEAKING: "Not Speaking",
  SLEEPING: "Sleeping",
  CONNECTION: "Connection",
  DISCONNECTION: "Disconnection",
};

const SpecificOutfitPage = (props) => {
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
  const [outfit, setOutfit] = React.useState(
    useRouteLoaderData("specificOutfit").outfit
  );
  const [performer, setPerformer] = React.useState(
    useRouteLoaderData("specificOutfit").performer
  );
  const [leftBoxState, setLeftBoxState] = React.useState("Options");
  const [viewedAnimation, setViewedAnimation] = React.useState(null);

  const updateAnimationsObject = () => {
    let newAnimationsObject = {};
    for (const animation of outfit.animations) {
      newAnimationsObject[animation.animation_type] = animation;
    }
    return newAnimationsObject;
  };

  const uploadNewAnimationHandler = (event) => {
    setViewedAnimation(event.currentTarget.id);
    setLeftBoxState("Upload");
  };
  const onUploadAnimation = async (newAnimation) => {
    //If the animation already exists, delete old and add new
    if (animationsObject[newAnimation.animation_type]) {
      await deleteAnimation(
        localStorage.getItem("token"),
        animationsObject[newAnimation.animation_type].identifier
      );
      const result = await addNewAnimation(
        localStorage.getItem("token"),
        newAnimation
      );
      const newOutfit = { ...outfit };
      newOutfit.animations = outfit.animations.filter(
        (animation) => animation.animation_type !== newAnimation.animation_type
      );
      newOutfit.animations.push(result);
      setLeftBoxState("Options");
      setOutfit(newOutfit);
    } else {
      const result = await addNewAnimation(
        localStorage.getItem("token"),
        newAnimation
      );
      const newOutfit = { ...outfit };
      newOutfit.animations.push(result);
      setLeftBoxState("Options");
      setOutfit(newOutfit);
    }
  };
  const deleteAnimationHandler = async (event) => {
    const newOutfit = { ...outfit };
    newOutfit.animations = outfit.animations.filter(
      (animation) => animation.identifier !== event.currentTarget.id
    );
    await deleteAnimation(
      localStorage.getItem("token"),
      event.currentTarget.id
    );
    setLeftBoxState("Options");
    setOutfit(newOutfit);
  };
  const onUpdateOutfit = async (newOutfit) => {
    const result = await updateOutfit(
      localStorage.getItem("token"),
      outfit.identifier,
      newOutfit
    );
    setOutfit(newOutfit);
  };
  const animationsObject = updateAnimationsObject();

  let animationCards = animationTypes.map((animationType) => (
    <Card key={animationType} sx={styles.card}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={styles.topText}
        >
          {convertKeyToName(animationType)}
        </Typography>
      </CardContent>
      <div style={styles.previewImageContainer}>
        <img
          style={styles.previewImage}
          src={
            animationsObject[animationType] !== null &&
            animationsObject[animationType] !== undefined
              ? animationsObject[animationType].animation_path
              : "https://www.pikpng.com/pngl/m/202-2022667_red-cancel-delete-no-forbidden-prohibited-stop-sign.png"
          }
          alt={convertKeyToName(animationType)}
        />
      </div>
      <CardActions sx={styles.buttonPadding}>
        <Tooltip title="Upload new animaton">
          <IconButton onClick={uploadNewAnimationHandler} id={animationType}>
            <UploadFileIcon />
          </IconButton>
        </Tooltip>
        {animationsObject[animationType] !== null &&
        animationsObject[animationType] !== undefined ? (
          <Tooltip title="Remove animation">
            <IconButton
              onClick={deleteAnimationHandler}
              id={animationsObject[animationType].identifier}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}

        <Tooltip title="Use current discord PFP">
          <IconButton>
            <AccountBoxIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  ));

  let leftBox = (
    <ActorOptionsView
      outfit={outfit}
      performer={performer}
      updateOutfit={onUpdateOutfit}
    />
  );
  if (leftBoxState === "Upload") {
    leftBox = (
      <UploadAnimationView
        outfit={outfit}
        animationType={viewedAnimation}
        currentAnimation={animationsObject[viewedAnimation]}
        performer={performer}
        uploadAnimation={onUploadAnimation}
      />
    );
  }

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

export default SpecificOutfitPage;
