import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const deleteAnimation = async (token, animationId) => {
  const url = debug_redirects.BACKEND_ANIMATIONS_MODIFY + animationId + "/";
  const responseData = await baseDeleteFunction(token, url);
  return responseData;
};

export default deleteAnimation;
