import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const getStageFromBackend = async (identifier, callback = noSetCallback) => {
  const url = debug_redirects.BACKEND_STAGE + identifier + "/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return callback(response);
};

export default getStageFromBackend;
