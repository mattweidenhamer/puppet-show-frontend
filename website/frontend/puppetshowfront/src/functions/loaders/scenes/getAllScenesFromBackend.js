import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const getAllScenesFromBackend = async (token) => {
  return baseLoaderFunction(token, debug_redirects.BACKEND_SCENES);
};

export default getAllScenesFromBackend;
