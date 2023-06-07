const baseCreateFunction = async (token, url, object) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(object),
  });
  return response;
};

export default baseCreateFunction;
