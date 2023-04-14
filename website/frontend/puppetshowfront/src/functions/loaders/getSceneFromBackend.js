import scene_test from "../../constants/scene_test.json";

const getSceneFromBackend = async (params) => {
  const sceneID = params.sceneId;
  // In the future, this will be a call to the backend.
  // For now, get the requested scene from the test scenes.
  return scene_test[sceneID];
};

export default getSceneFromBackend;
