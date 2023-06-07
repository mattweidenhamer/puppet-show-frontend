import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects";
import noSetCallback from "../../callbacks/noSetCallback";

const deleteOutfit = async (token, sceneID, callback = noSetCallback) => {
  const url = debug_redirects.BACKEND_SCENES + sceneID + "/";
  const responseData = await baseDeleteFunction(token, url);
  return callback(responseData);
};

export default deleteOutfit;
