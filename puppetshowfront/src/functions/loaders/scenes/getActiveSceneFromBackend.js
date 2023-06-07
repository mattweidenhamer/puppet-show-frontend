import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getActiveSceneFromBackend = async (token, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/scenes/active/";
  const scene = await baseLoaderFunction(token, url);
  return callback(scene);
};

export default getActiveSceneFromBackend;
