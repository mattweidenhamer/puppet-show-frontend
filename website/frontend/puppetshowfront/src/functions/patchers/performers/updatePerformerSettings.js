import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const updatePerformerSettings = async (token, performerId, settings) => {
  const url = debug_redirects.BACKEND_PERFORMERS + performerId + "/";
  const result = await basePatchFunction(token, url, settings);
  return result;
};

export default updatePerformerSettings;
