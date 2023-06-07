import baseDeleteFunction from "../baseDeleteFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const deletePerformer = async (
  token,
  performerId,
  callback = noSetCallback
) => {
  const url = getBackendUrl + "ps/performers/" + performerId + "/";
  const deleteResponse = await baseDeleteFunction(token, url);
  return callback(deleteResponse);
};

export default deletePerformer;
