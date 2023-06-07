const getScenePreviewImage = (scene) => {
  if (scene !== null && scene !== undefined) {
    for (const outfit of scene["outfits"]) {
      if (outfit.animations.length > 0) {
        return outfit.animations[0].animation_path;
      }
    }
  }
  // TODO replace with image that I own
  return "https://www.pikpng.com/pngl/m/202-2022667_red-cancel-delete-no-forbidden-prohibited-stop-sign.png";
};

export default getScenePreviewImage;
