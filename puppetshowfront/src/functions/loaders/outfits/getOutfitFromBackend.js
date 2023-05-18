import React from "react";
import debug_redirects from "../../../constants/debug_redirects.json";
import actor_test from "../../../constants/actor_test.json";
import baseLoaderFunction from "../baseLoaderFunction";

const getOutfitFromBackend = async (token, outfitID, sceneID) => {
  const url = debug_redirects.BACKEND_OUTFIT_MODIFY + `${outfitID}`;
  return baseLoaderFunction(token, url);
};

export default getOutfitFromBackend;
