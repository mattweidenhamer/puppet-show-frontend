import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const deleteOutfit = async (token, sceneID, outfitId) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + outfitId + "/";
  const responseData = await baseDeleteFunction(token, url);
  return responseData;
};

export default deleteOutfit;
