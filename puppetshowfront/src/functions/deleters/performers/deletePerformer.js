import baseDeleteFunction from "../baseDeleteFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const deletePerformer = async (
  token,
  performerId,
  callback = noSetCallback
) => {
  const deleteResponse = await baseDeleteFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS + performerId + "/"
  );
  return callback(deleteResponse);
};

export default deletePerformer;
