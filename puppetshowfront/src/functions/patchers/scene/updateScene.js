import basePatchFunction from "../basePatchFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const updateScene = async (
  token,
  sceneId,
  updatedScene,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/scenes/" + sceneId + "/";
  const result = await basePatchFunction(token, url, updatedScene);
  return callback(result);
};

export default updateScene;
