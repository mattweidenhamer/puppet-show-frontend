import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseLoaderFunction from "../baseLoaderFunction";

const getUserFromBackend = async (token, callback = noSetCallback) => {
  const user = await baseLoaderFunction(token, debug_redirects.BACKEND_USER);
  return callback(user);
};

export default getUserFromBackend;
