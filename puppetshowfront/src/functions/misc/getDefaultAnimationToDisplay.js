const getDefaultAnimationToDisplay = (outfit) => {
  if (outfit.animations.length === 0) {
    // console.error("Passed an outfit with no animation!");
    return "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png";
  } else if (outfit.animations.speaking_animation !== null) {
    return outfit.animations.speaking_animation;
  }
  if (outfit.animations.not_speaking_animation !== null) {
    return outfit.animations.mute_animation;
  }
  if (outfit.animations.sleeping_animation !== null) {
    return outfit.animations.sleeping_animation;
  }
  if (outfit.animations.connection_animation !== null) {
    return outfit.animations.connection_animation;
  }
  if (outfit.animations.disconnection_animation !== null) {
    return outfit.animations.disconnection_animation;
  }
  //TODO replace with a default icon that I own
  return "https://www.pngfind.com/pngs/m/6-62867_x-mark-multiply-times-symbol-red-incorrect-wrong.png";
};

export default getDefaultAnimationToDisplay;
