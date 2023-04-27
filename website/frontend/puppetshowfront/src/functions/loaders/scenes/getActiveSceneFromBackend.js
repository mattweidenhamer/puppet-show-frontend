import debug_redirects from "../../../constants/debug_redirects.json";
import baseLoaderFunction from "../baseLoaderFunction";

const getActiveSceneFromBackend = async (token) => {
    return baseLoaderFunction(token, debug_redirects.BACKEND_SCENES + debug_redirects.BACKEND_SCENE_ACTIVE_EXTENSION);
};

export default getActiveSceneFromBackend;