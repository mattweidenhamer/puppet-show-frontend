import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getStagePerformerFromBackend = async (
  token,
  performerID,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/stage/" + performerID + "/";
  const stageperformer = await baseLoaderFunction(token, url);
  return callback(stageperformer);
};

export default getStagePerformerFromBackend;
