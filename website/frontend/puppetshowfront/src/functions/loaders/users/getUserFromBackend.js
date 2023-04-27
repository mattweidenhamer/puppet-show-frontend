import debug_redirects from "../../../constants/debug_redirects.json";
import baseLoaderFunction from "../baseLoaderFunction";

const getUserFromBackend = async (token) => {
  const user = await baseLoaderFunction(token, debug_redirects.BACKEND_USER);
  return user;
};

export default getUserFromBackend;
