import debug_redirects from "../../../constants/debug_redirects.json";
import production_redirects from "../../../constants/production_redirects.json"
import baseLoaderFunction from "../baseLoaderFunction";

const getAllPerformersFromBackend = async (token) => {
    return baseLoaderFunction(token, debug_redirects.BACKEND_PERFORMERS);
};

export default getAllPerformersFromBackend;