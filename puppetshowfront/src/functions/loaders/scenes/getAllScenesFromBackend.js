import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const getAllScenesFromBackend = async (token, callback = noSetCallback) => {
  const scenes = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_SCENES
  );
  return callback(scenes);
};

export default getAllScenesFromBackend;
