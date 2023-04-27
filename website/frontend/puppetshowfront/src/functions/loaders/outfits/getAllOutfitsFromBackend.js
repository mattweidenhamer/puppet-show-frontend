import debug_redirects from "../../../constants/debug_redirects.json";
import production_redirects from "../../../constants/production_redirects.json"
import baseLoaderFunction from "../baseLoaderFunction";

const getAllOutfitsFromBackend = async (token, sceneID) => {
    return baseLoaderFunction(token, debug_redirects.BACKEND_SCENES + `/${sceneID}` + debug_redirects.BACKEND_SCENE_OUTFITS_EXTENSION);
};

export default getAllOutfitsFromBackend;