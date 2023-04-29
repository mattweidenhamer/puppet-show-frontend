import baseLoaderFunction from "../baseLoaderFunction";
import debug_redirects from "../../../constants/debug_redirects.json";

const getStageFromBackend = async (identifier) => {
  const url = debug_redirects.BACKEND_STAGE + identifier + "/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok === false) {
    console.log(
      `Response not okay, returned status ${response.status}: ${response.statusText}`
    );
    return null;
  }
  const responseData = response.json();
  return responseData;
};

export default getStageFromBackend;
