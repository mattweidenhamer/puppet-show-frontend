const baseDeleteFunction = async (token, url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return response;
};

export default baseDeleteFunction;
