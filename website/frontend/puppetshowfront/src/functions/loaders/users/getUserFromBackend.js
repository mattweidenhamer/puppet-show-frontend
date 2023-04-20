import debug_redirects from "../../../constants/debug_redirects.json";

const getUserFromBackend = async (token) => {
  const response = await fetch(debug_redirects.BACKEND_USER, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  if (response.status === 401) {
    console.log(response);
    return null;
  }
  const user = await response.json();
  return user;
};

export default getUserFromBackend;
