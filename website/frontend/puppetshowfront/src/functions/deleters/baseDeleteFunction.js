const baseDeleteFunction = async (token, url) => {
  // TODO consider adding callback functions to these for better error handling
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.ok === false) {
    console.log(
      `Response not okay, returned status ${response.status}: ${response.statusText}`
    );
    console.log(`Request url was ${url}`);
    return null;
  }
  if (response.status === 204) {
    return null;
  }
  const responseData = response.json();
  return responseData;
};

export default baseDeleteFunction;
