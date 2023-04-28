import debug_redirects from "../../../constants/debug_redirects.json";
import baseCreateFunction from "../baseCreateFunction";

const addNewScene = async (token, scene) => {
  const newScene = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_SCENES,
    scene
  );
  return newScene;
};
export default addNewScene;
