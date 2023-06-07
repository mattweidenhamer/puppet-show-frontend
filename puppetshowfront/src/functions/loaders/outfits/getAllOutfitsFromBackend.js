import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getAllOutfitsFromBackend = async (
  token,
  sceneID,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneID + "/outfits/";
  const response = await baseLoaderFunction(token, url);
  return callback(response);
};

export default getAllOutfitsFromBackend;
