import baseCreateFunction from "../baseCreateFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const addNewPerformer = async (token, performer) => {
  const newPerformer = await baseCreateFunction(
    token,
    debug_redirects.BACKEND_PERFORMERS,
    performer
  );
  console.log(newPerformer);
  return newPerformer;
};

export default addNewPerformer;
