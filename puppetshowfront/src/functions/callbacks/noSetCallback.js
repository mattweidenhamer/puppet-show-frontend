const noSetCallback = (response) => {
  console.warn(
    "No callback set for this function, consider writing a more in-depth one."
  );
  if (response === null) {
    console.log("Response was null.");
    return null;
  } else if (response.ok === false) {
    console.log(
      `Response not okay, returned status ${response.status}: ${response.statusText}.`
    );
    return null;
  }
  if (response.status === 204) {
    console.log("Response was 204.");
    return null;
  }
  return response.json();
};

export default noSetCallback;
