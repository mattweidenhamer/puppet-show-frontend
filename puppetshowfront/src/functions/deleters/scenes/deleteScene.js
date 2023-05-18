import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects";

const deleteOutfit = async (token, sceneID) => {
  const url = debug_redirects.BACKEND_SCENES + sceneID + "/";
  const responseData = await baseDeleteFunction(token, url);
  return responseData;
};

export default deleteOutfit;
