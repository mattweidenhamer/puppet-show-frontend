import baseCreateFunction from "../baseCreateFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const addNewOutfit = async (
  token,
  sceneIdentifier,
  outfit,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneIdentifier + "/outfits/";
  const response = await baseCreateFunction(token, url, outfit);
  return callback(response);
};

export default addNewOutfit;
