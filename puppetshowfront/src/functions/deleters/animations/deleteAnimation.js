import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const deleteAnimation = async (
  token,
  animationId,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_ANIMATIONS_MODIFY + animationId + "/";
  const responseCallback = await baseDeleteFunction(token, url);
  return callback(responseCallback);
};

export default deleteAnimation;
