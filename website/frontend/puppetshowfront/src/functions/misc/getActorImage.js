import actorStates from "../../constants/actorStates.json";
import React from "react";

const getActorImage = (actor, actorState) => {
  let animations = actor.animations;
  if (animations === null || animations === undefined) {
    animations = {};
    animations.speaking_animation = `https://${actor.discord_avatar}`;
    animations.not_speaking_animation = `https://${actor.discord_avatar}`;
  } else if (actorState === null || actorState === undefined) {
    console.log("Received bad Actor State.");
    return null;
  } else if (actorState === actorStates.START_SPEAKING) {
    return animations.speaking_animation;
  } else if (actorState === actorStates.STOP_SPEAKING) {
    return animations.not_speaking_animation;
  } else if (actorState === actorStates.SLEEPING) {
    if (animations.sleeping_animation === null) {
      return animations.not_speaking_animation;
    }
    return animations.sleeping_animation;
  } else if (actorState === actorStates.CONNECTION) {
    if (animations.connection_animation === null) {
      return animations.not_speaking_animation;
    }
    return animations.connnection_animation;
  } else if (actorState === actorStates.DISCONNECTION) {
    return animations.disconnect_animation;
  } else if (actorState === actorStates.GONE) {
    return;
  }
  console.log("Received weird actor state that I couldn't define.");
  console.log(actorState);
  return null;
};

export default getActorImage;
