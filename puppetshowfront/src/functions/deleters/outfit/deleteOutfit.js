import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const deleteOutfit = async (
  token,
  sceneID,
  outfitId,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + outfitId + "/";
  const responseData = await baseDeleteFunction(token, url);
  return callback(responseData);
};

export default deleteOutfit;
