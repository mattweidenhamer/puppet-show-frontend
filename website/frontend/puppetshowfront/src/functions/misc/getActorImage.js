import actorStates from "../../constants/actorStates";

const getActorImage = (actor, actorState) => {
  const animations = actor.animations;
  if (actorState === null || actorState === undefined) {
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
  return null;
};

export default getActorImage;
