import baseLoaderFunction from "../baseLoaderFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const getSceneFromBackend = async (
  token,
  sceneID,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneID + "/";
  const scene = await baseLoaderFunction(token, url);
  return callback(scene);
};

export default getSceneFromBackend;
