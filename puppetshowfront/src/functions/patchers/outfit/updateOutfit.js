import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";
import noSetCallback from "../../callbacks/noSetCallback";

const updateOutfit = async (
  token,
  outfitId,
  newOutfit,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + outfitId + "/";
  const result = await basePatchFunction(token, url, newOutfit);
  return callback(result);
};

export default updateOutfit;
