const getDefaultAnimationToDisplay = (actor) => {
  if (actor.animations.speaking_animation !== null) {
    return actor.animations.speaking_animation;
  }
  if (actor.animations.not_speaking_animation !== null) {
    return actor.animations.mute_animation;
  }
  if (actor.animations.sleeping_animation !== null) {
    return actor.animations.sleeping_animation;
  }
  if (actor.animations.connection_animation !== null) {
    return actor.animations.connection_animation;
  }
  if (actor.animations.disconnection_animation !== null) {
    return actor.animations.disconnection_animation;
  }
  //TODO replace with a default icon that I own
  return "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png";
};

export default getDefaultAnimationToDisplay;
