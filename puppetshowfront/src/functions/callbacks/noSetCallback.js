const noSetCallback = async (response) => {
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
  try {
    const json = await response.json();
    return json;
  } catch (error) {
    console.debug("Response had no body.");
    return null;
  }
};

export default noSetCallback;
