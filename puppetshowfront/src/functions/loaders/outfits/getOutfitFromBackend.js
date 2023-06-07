import React from "react";
import debug_redirects from "../../../constants/debug_redirects.json";
import actor_test from "../../../constants/actor_test.json";
import baseLoaderFunction from "../baseLoaderFunction";
import noSetCallback from "../../callbacks/noSetCallback";

const getOutfitFromBackend = async (
  token,
  outfitID,
  sceneID,
  callback = noSetCallback
) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + `${outfitID}`;
  const response = await baseLoaderFunction(token, url);
  return callback(response);
};

export default getOutfitFromBackend;
