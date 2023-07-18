import React from "react";
import actorStates from "../../constants/actorStates";
import getActorImage from "../../../functions/misc/getActorImage";

const styles = {
  stageContainer: {
    display: "flex",
    padding: "10px",
    textAlign: "center",
    height: "300px",
    width: "300px",
  },
  actorImage: {
    textAlign: "center",
    justify: "center",
    width: "100%",
    height: "100%",
  },
};

const Stage = (props) => {
  //Handle selection of the animation and how it is displayed here.
  const performer = props.performer;
  let converted_settings = {};
  if (performer.animations === null || performer.animations === undefined) {
    performer.animations = {};
    performer.animations.speaking_animation = `https://${performer.discord_avatar}`;
    performer.animations.not_speaking_animation = `https://${performer.discord_avatar}`;
    converted_settings["filter"] = "grayscale(100%)";
  } else {
    if (
      props.settings.grayScaleOnNotTalking &&
      props.actorState === actorStates.STOP_SPEAKING
    ) {
      converted_settings["filter"] = "grayscale(100%)";
    }
  }
  const performerDisplay = (
    <img
      src={getActorImage(performer, props.actorState)}
      alt={performer.name}
      style={{ ...styles.actorImage, ...converted_settings }}
    />
  );

  return <div style={styles.stageContainer}>{performerDisplay}</div>;
};

export default Stage;
