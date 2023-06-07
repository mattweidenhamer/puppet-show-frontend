import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseLoaderFunction from "../baseLoaderFunction";

const getActiveSceneFromBackend = async (token, callback = noSetCallback) => {
  const scene = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_SCENES +
      debug_redirects.BACKEND_SCENE_ACTIVE_EXTENSION
  );
  return callback(scene);
};

export default getActiveSceneFromBackend;
