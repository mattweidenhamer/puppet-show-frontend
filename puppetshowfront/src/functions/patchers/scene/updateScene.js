import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const updateScene = async (
  token,
  sceneId,
  updatedScene,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_SCENES + sceneId + "/";
  const result = await basePatchFunction(token, url, updatedScene);
  return callback(result);
};

export default updateScene;
