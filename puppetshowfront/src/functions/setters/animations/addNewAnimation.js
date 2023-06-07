import baseCreateFunction from "../baseCreateFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const addNewAnimation = async (token, animation, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/animations/";
  const response = await baseCreateFunction(token, url, animation);
  return callback(response);
};

export default addNewAnimation;
