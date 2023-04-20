import scene_test from "../../../constants/scene_test.json";

const getAllScenesFromBackend = async () => {
  //In the future, this should connect to the django server and get all the scenes the user can see.
  //For now, return test data.
  return scene_test;
};

export default getAllScenesFromBackend;
