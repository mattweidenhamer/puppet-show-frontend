import getFrontendUrl from "./getFrontendUrl";

const getPerformerUrl = (performer) => {
  const url = getFrontendUrl() + "stage/" + performer.identifier;
  return url;
};

export default getPerformerUrl;
