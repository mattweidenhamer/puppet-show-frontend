import basePatchFunction from "../basePatchFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const updateOutfit = async (token, outfitId, newOutfit) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + outfitId + "/";
  const result = await basePatchFunction(token, url, newOutfit);
  return result;
};

export default updateOutfit;
