import basePatchFunction from "../basePatchFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const updatePerformerSettings = async (
  token,
  performerId,
  newPerformer,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/performers/" + performerId + "/";
  const result = await basePatchFunction(token, url, newPerformer);
  return callback(result);
};

export default updatePerformerSettings;
