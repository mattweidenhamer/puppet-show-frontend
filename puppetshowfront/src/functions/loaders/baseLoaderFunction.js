const baseLoaderFunction = async (token, url) => {
  // TODO consider adding callback functions to these for better error handling
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok === false) {
    console.log(
      `Response not okay, returned status ${response.status}: ${response.statusText}`
    );
    return null;
  }
  return response;
};

export default baseLoaderFunction;
