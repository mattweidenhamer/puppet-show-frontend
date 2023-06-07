import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const updatePerformerSettings = async (
  token,
  performerId,
  newPerformer,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_PERFORMERS + performerId + "/";
  const result = await basePatchFunction(token, url, newPerformer);
  return callback(result);
};

export default updatePerformerSettings;
