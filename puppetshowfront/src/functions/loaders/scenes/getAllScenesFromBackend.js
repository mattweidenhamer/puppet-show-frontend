import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const getAllScenesFromBackend = async (token) => {
  const scenes = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_SCENES
  );
  return scenes;
};

export default getAllScenesFromBackend;
