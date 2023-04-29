import debug_redirects from "../../../constants/debug_redirects.json";
import baseLoaderFunction from "../baseLoaderFunction";

const getAllPerformersFromBackend = async (token) => {
  const performers = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS
  );
  return performers;
};

export default getAllPerformersFromBackend;
