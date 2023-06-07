const basePatchFunction = async (token, url, object) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(object),
  });
  console.log(response);
  if (response.ok === false) {
    console.log(
      `Response not okay, returned status ${response.status}: ${response.statusText}`
    );
    return null;
  }
  return response;
};

export default basePatchFunction;
