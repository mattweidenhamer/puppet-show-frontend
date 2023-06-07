import baseDeleteFunction from "../baseDeleteFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const deleteAnimation = async (
  token,
  animationId,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/animations/" + animationId + "/";
  const responseCallback = await baseDeleteFunction(token, url);
  return callback(responseCallback);
};

export default deleteAnimation;
