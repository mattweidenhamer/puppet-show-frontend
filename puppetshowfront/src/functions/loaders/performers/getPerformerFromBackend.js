import debug_redirects from "../../../constants/debug_redirects.json";
import production_redirects from "../../../constants/production_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";
import baseLoaderFunction from "../baseLoaderFunction";

const getPerformerFromBackend = async (
  token,
  performerID,
  callback = noSetCallback
) => {
  const performer = await baseLoaderFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS + `${performerID}`
  );
  return callback(performer);
};

export default getPerformerFromBackend;
