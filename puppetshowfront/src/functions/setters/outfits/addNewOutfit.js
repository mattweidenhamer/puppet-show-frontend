import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const addNewOutfit = async (
  token,
  sceneIdentifier,
  outfit,
  callback = noSetCallback
) => {
  const url =
    debug_redirects.BACKEND_SCENES +
    sceneIdentifier +
    debug_redirects.BACKEND_SCENE_OUTFITS_EXTENSION;
  const response = await baseCreateFunction(token, url, outfit);
  return callback(response);
};

export default addNewOutfit;
