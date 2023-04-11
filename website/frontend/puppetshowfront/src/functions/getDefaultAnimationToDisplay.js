const getDefaultAnimationToDisplay = (actor) => {
  if (actor.speaking_animation !== null) {
    return actor.speaking_animation;
  }
  if (actor.not_speaking_animation !== null) {
    return actor.mute_animation;
  }
  if (actor.sleeping_animation !== null) {
    return actor.sleeping_animation;
  }
  if (actor.connection_animation !== null) {
    return actor.connection_animation;
  }
  if (actor.disconnection_animation !== null) {
    return actor.disconnection_animation;
  }
  //TODO replace with a default icon that I own
  return "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png";
};

export default getDefaultAnimationToDisplay;
