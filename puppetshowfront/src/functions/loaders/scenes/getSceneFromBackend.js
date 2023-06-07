import scene_test from "../../../constants/scene_test.json";
import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const getSceneFromBackend = async (
  token,
  sceneID,
  callback = noSetCallback
) => {
  const scene = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_SCENES + sceneID
  );
  return callback(scene);
};

export default getSceneFromBackend;
