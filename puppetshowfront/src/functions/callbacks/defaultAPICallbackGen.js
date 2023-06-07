const defaultAPICallbackGen = (toasterFunctions) => {
  return function APICallback(response) {
    console.warn("Using default API callback, consider writing a custom one.");
    if (response === null) {
      console.log("Response was null.");
      if (toasterFunctions !== null) {
        toasterFunctions.message("An error occured: Response was null.");
        toasterFunctions.type("error");
        toasterFunctions.open(true);
      }
      return null;
    } else if (response.ok === false) {
      console.log(
        `Response not okay, returned status ${response.status}: ${response.statusText}.`
      );
      if (toasterFunctions !== undefined && toasterFunctions !== null) {
        toasterFunctions.message(
          `An error occured:: ${response.status} ${response.statusText}.`
        );
        toasterFunctions.type("error");
        toasterFunctions.open(true);
      }
      return null;
    }
    if (response.status === 204) {
      console.log("Response was 204, returning null.");
      return null;
    }
    return response.json();
  };
};

export default defaultAPICallbackGen;
