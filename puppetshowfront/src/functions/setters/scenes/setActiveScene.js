import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const setActiveScene = async (token, sceneID, callback = noSetCallback) => {
  const response = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_SCENES +
      sceneID +
      "/" +
      debug_redirects.BACKEND_SCENE_SET_ACTIVESCENE_EXTENSION
  );
  return callback(response);
};

export default setActiveScene;
