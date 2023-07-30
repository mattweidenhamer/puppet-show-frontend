import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const getStageCustomOutfitFromBackend = async (
  identifier,
  outfitIdentifier,
  callback = noSetCallback
) => {
  const url =
    getBackendUrl() + "ps/stage/" + identifier + "/" + outfitIdentifier + "/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return callback(response);
};

export default getStageCustomOutfitFromBackend;
