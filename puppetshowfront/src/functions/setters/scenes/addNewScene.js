import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseCreateFunction from "../baseCreateFunction";

const addNewScene = async (token, scene, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/scenes/";
  const newScene = await baseCreateFunction(token, url, scene);
  return callback(newScene);
};
export default addNewScene;
