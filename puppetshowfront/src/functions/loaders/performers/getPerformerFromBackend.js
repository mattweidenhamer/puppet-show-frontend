import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getPerformerFromBackend = async (
  token,
  performerID,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/performers/" + performerID + "/";
  const performer = await baseLoaderFunction(token, url);
  return callback(performer);
};

export default getPerformerFromBackend;
