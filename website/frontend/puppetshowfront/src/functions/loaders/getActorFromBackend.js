import React from "react";
import actor_test from "../../constants/actor_test.json";

const getActorFromBackend = async (actorId) => {
  //In the future, this should connect to the django server and get all the actor's data.
  //For now, return test data.
  return actor_test;
};

export default getActorFromBackend;
