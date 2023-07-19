const getBotUrl = () => {
  let baseUrl = "";
  if (process.env.REACT_APP_DEBUG === "True") {
    baseUrl = process.env.REACT_APP_BOT_DEBUG;
  } else if (process.env.REACT_APP_DEBUG === "False") {
    baseUrl = process.env.REACT_APP_BOT_PROD;
  } else {
    throw new Error("REACT_APP_DEBUG not set to True or False");
  }
  return baseUrl;
};

export default getBotUrl;
