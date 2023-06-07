import baseCreateFunction from "../baseCreateFunction";
import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";

const addNewPerformer = async (token, performer, callback = noSetCallback) => {
  const newPerformer = await baseCreateFunction(
    token,
    getBackendUrl() + "ps/performers/",
    performer
  );
  return callback(newPerformer);
};

export default addNewPerformer;
