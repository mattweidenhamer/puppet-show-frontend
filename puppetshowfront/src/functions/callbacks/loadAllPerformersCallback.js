const loadAllPerformersCallback = async (response) => {
  if (!response.ok) {
    console.warning(
      `Response not OK, returned status ${response.status}: ${response.statusText}`
    );
    console.log(response);
    return null;
  }
  return await response.json();
};

export default loadAllPerformersCallback;
