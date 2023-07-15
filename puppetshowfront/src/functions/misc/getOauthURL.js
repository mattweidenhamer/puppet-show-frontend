const getOauthURL = () => {
  let baseUrl = "";
  if (process.env.REACT_APP_DEBUG) {
    baseUrl = process.env.REACT_APP_DISCORD_OAUTH_URL_DEBUG;
  } else {
    baseUrl = process.env.REACT_APP_DISCORD_OAUTH_URL_PROD;
  }
  return baseUrl;
};

export default getOauthURL;
