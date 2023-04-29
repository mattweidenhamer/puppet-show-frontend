import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects";

const deletePerformer = async (token, performerId) => {
  const url = debug_redirects.BACKEND_PERFORMERS + performerId + "/";
  const responseData = await baseDeleteFunction(token, url);
  return responseData;
};

export default deletePerformer;
