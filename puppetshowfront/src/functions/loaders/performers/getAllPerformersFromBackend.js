import noSetCallback from "../../callbacks/noSetCallback";
import getBackendUrl from "../../misc/getBackendUrl";
import baseLoaderFunction from "../baseLoaderFunction";

const getAllPerformersFromBackend = async (token, callback = noSetCallback) => {
  const url = getBackendUrl() + "ps/performers/";
  const response = await baseLoaderFunction(token, url);
  return callback(response);
};

export default getAllPerformersFromBackend;
