import baseLoaderFunction from "../baseLoaderFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const getAllScenesFromBackend = async (token, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/scenes/";
  const scenes = await baseLoaderFunction(token, url);
  return callback(scenes);
};

export default getAllScenesFromBackend;
