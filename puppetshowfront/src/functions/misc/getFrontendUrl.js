const getFrontendUrl = () => {
  let baseUrl = "";
  if (process.env.REACT_APP_DEBUG) {
    baseUrl = process.env.REACT_APP_BACKEND_DEBUG;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_PROD;
  }
  return baseUrl;
};

export default getFrontendUrl;
