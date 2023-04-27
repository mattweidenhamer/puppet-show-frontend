import React from "react";
import debug_redirects from "../../../constants/debug_redirects.json";
import actor_test from "../../../constants/actor_test.json";
import baseLoaderFunction from "../baseLoaderFunction";

const getOutfitFromBackend = async (token, outfitID, sceneID) => {
  //In the future, this should connect to the django server and get all the actor's data.
  //For now, return test data.
  const url = debug_redirects.BACKEND_SCENES + `/${sceneID}` + debug_redirects.BACKEND_SCENE_OUTFITS_EXTENSION + `/${outfitID}`;
  return baseLoaderFunction(token, url)
};

export default getOutfitFromBackend;
