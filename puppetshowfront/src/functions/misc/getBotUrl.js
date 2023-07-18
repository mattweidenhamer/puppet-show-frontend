const getBotUrl = () => {
  let baseUrl = "";
  if (process.env.REACT_APP_DEBUG) {
    baseUrl = process.env.REACT_APP_BOT_DEBUG;
  } else {
    baseUrl = process.env.REACT_APP_BOT_PROD;
  }
  return baseUrl;
};

export default getBotUrl;
