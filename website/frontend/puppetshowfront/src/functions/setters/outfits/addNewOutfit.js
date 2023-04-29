import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const addNewOutfit = async (token, sceneIdentifier, outfit) => {
  const url =
    debug_redirects.BACKEND_SCENES +
    sceneIdentifier +
    debug_redirects.BACKEND_SCENE_OUTFITS_EXTENSION;
  const response = await baseCreateFunction(token, url, outfit);
  return response;
};

export default addNewOutfit;
