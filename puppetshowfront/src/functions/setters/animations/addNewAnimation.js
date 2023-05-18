import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const addNewAnimation = async (token, animation) => {
  const url = debug_redirects.BACKEND_ANIMATIONS_MODIFY;
  const response = await baseCreateFunction(token, url, animation);
  return response;
};

export default addNewAnimation;
