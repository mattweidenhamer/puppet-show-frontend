import React from "react";

import baseLoaderFunction from "../baseLoaderFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const getOutfitFromBackend = async (
  token,
  outfitID,
  sceneID,
  callback = noSetCallback
) => {
  const url = getBackendUrl() + `ps/outfits/${outfitID}`;
  const response = await baseLoaderFunction(token, url);
  return callback(response);
};

export default getOutfitFromBackend;
