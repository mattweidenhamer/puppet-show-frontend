import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const getStageFromBackend = async (identifier, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/stage/" + identifier + "/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return callback(response);
};

export default getStageFromBackend;
