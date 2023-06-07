import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseLoaderFunction from "../baseLoaderFunction";

const getAllPerformersFromBackend = async (token, callback = noSetCallback) => {
  const response = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS
  );
  return callback(response);
};

export default getAllPerformersFromBackend;
