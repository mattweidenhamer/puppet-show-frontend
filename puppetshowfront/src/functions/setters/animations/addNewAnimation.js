import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const addNewAnimation = async (token, animation, callback = noSetCallback) => {
  const url = debug_redirects.BACKEND_ANIMATIONS_MODIFY;
  const response = await baseCreateFunction(token, url, animation);
  return callback(response);
};

export default addNewAnimation;
