import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const addNewPerformer = async (token, performer, callback = noSetCallback) => {
  const newPerformer = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS,
    performer
  );
  return callback(newPerformer);
};

export default addNewPerformer;
