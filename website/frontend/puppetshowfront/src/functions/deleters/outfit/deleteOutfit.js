import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects";

const deleteOutfit = async (token, sceneID, outfitId) => {
  const url =
    debug_redirects.BACKEND_SCENES +
    sceneID +
    debug_redirects.BACKEND_SCENE_OUTFITS_EXTENSION +
    outfitId +
    "/";
  const responseData = await baseDeleteFunction(token, url);
  return responseData;
};

export default deleteOutfit;
