import scene_test from "../../../constants/scene_test.json";
import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const getSceneFromBackend = async (token, sceneID) => {
  const scene = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_SCENES + sceneID
  );
  return scene;
};

export default getSceneFromBackend;
