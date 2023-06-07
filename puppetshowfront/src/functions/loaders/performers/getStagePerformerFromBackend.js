import debug_redirects from "../../../constants/debug_redirects.json";
import production_redirects from "../../../constants/production_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseLoaderFunction from "../baseLoaderFunction";

const getStagePerformerFromBackend = async (
  token,
  performerID,
  callback = noSetCallback
) => {
  const stageperformer = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_STAGE + `/${performerID}`
  );
  return callback(stageperformer);
};

export default getStagePerformerFromBackend;
