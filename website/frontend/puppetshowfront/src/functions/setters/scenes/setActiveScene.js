import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const setActiveScene = async (token, sceneID) => {
  const response = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_SCENES +
      sceneID +
      "/" +
      debug_redirects.BACKEND_SCENE_SET_ACTIVESCENE_EXTENSION,
    {}
  );
};

export default setActiveScene;
