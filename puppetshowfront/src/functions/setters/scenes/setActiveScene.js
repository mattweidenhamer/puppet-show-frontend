import baseCreateFunction from "../baseCreateFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const setActiveScene = async (token, sceneID, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneID + "/setActive/";
  const response = await baseCreateFunction(token, url);
  return callback(response);
};

export default setActiveScene;
