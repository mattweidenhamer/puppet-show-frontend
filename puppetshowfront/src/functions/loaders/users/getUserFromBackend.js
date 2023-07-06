import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getUserFromBackend = async (token, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/user/";
  const user = await baseLoaderFunction(token, url);
  return callback(user);
};

export default getUserFromBackend;
