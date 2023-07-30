import getPerformerUrl from "./getPerformerUrl";

const getOutfitHardcodedUrl = (performer, outfit) => {
  const url = getPerformerUrl(performer) + "/" + outfit.identifier;
  return url;
};

export default getOutfitHardcodedUrl;
