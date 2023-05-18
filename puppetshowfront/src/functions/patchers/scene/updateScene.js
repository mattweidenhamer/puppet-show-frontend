import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const updateScene = async (token, sceneId, updatedScene) => {
  const url = debug_redirects.BACKEND_SCENES + sceneId + "/";
  const result = await basePatchFunction(token, url, updatedScene);
  return result;
};

export default updateScene;
