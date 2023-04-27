import debug_redirects from "../../../constants/debug_redirects.json";
import production_redirects from "../../../constants/production_redirects.json"
import baseLoaderFunction from "../baseLoaderFunction";

const getPerformerFromBackend = async (token, performerID) => {
    return baseLoaderFunction(token, debug_redirects.BACKEND_PERFORMERS + `/${performerID}`);
};

export default getPerformerFromBackend;