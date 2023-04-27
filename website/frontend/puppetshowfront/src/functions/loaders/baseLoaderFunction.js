const baseLoaderFunction = async (token, url) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    });
    if (response.ok === false) {
        console.log(`Response not okay, returned status ${response.status}: ${response.statusText}`);
        return null;
    }
    const responseData = response.json();
    return responseData;
};

export default baseLoaderFunction;