import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseCreateFunction from "../baseCreateFunction";

const addNewScene = async (token, scene, callback = noSetCallback) => {
  const newScene = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_SCENES,
    scene
  );
  return callback(newScene);
};
export default addNewScene;
