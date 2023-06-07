import basePatchFunction from "../basePatchFunction";

import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const updateOutfit = async (
  token,
  outfitId,
  newOutfit,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + "ps/outfits/" + outfitId + "/";
  const result = await basePatchFunction(token, url, newOutfit);
  return callback(result);
};

export default updateOutfit;
