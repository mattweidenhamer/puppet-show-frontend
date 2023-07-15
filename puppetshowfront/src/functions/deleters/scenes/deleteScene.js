import baseDeleteFunction from "../baseDeleteFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const deleteScene = async (token, sceneID, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneID + "/";
  const responseData = await baseDeleteFunction(token, url);
  return callback(responseData);
};

export default deleteScene;
