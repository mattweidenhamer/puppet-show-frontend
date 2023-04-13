import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import actor_test from "../testdata/actor_test.json";

const styles = {
  stageContainer: {
    display: "flex",
    padding: "10px",
    textAlign: "center",
    height: "300px",
    width: "300px",
  },
  actorImage: {
    textAlign: "center",
    justify: "center",
    width: "100%",
    height: "100%",
  },
};
const actorStates = {
  START_SPEAKING: "START_SPEAKING",
  STOP_SPEAKING: "STOP_SPEAKING",
  SLEEPING: "SLEEPING",
  CONNECTION: "CONNECTION",
  DISCONNECTION: "DISCONNECTION",
  GONE: "GONE", //Set if user is no longer in the voice channel and the animation is done playing.
};

const getActorImage = (actor, actorState) => {
  const animations = actor.animations;
  if (actorState === null || actorState === undefined) {
    console.log("Received bad Actor State.");
    return null;
  } else if (actorState === actorStates.START_SPEAKING) {
    return animations.speaking_animation;
  } else if (actorState === actorStates.STOP_SPEAKING) {
    return animations.not_speaking_animation;
  } else if (actorState === actorStates.SLEEPING) {
    if (animations.sleeping_animation === null) {
      return animations.not_speaking_animation;
    }
    return animations.sleeping_animation;
  } else if (actorState === actorStates.CONNECTION) {
    if (animations.connection_animation === null) {
      return animations.not_speaking_animation;
    }
    return animations.connnection_animation;
  } else if (actorState === actorStates.DISCONNECTION) {
    return animations.disconnect_animation;
  } else if (actorState === actorStates.GONE) {
    return;
  }
  console.log("Received weird actor state that I couldn't define.");
  return null;
};

const socketURL = "ws://localhost:8080";

const getActorData = (actorId) => {
  //In the future, this should connect to the django server and get all the actor's data.
  //For now, return test data.
  return actor_test;
};

const ActorStagePage = () => {
  // Load the actor hash based on the URL
  // Connect a websocket to the bot
  // Listen for updates from the bot

  const [actor, setActor] = React.useState(
    getActorData(window.location.pathname.split("/").pop())
  );
  const [actorState, setActorState] = React.useState(actorStates.GONE);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketURL, {
    onOpen: () => {
      console.log("Websocket connection established.");
      sendJsonMessage({ type: "ACTOR", actorId: actor.user_snowflake });
      console.log("Sent actor request.");
    },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage);
      const parsedMessage = JSON.parse(lastMessage.data);
      if (parsedMessage.type === "ACTOR_STATE") {
        setActorState(parsedMessage.data);
      }
    }
  }, [lastMessage, setActorState]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //const actor_image = translateToImage(actor, actorState);

  let actorDisplay =
    actorState === actorStates.GONE ? null : (
      <img
        src={getActorImage(actor, actorState)}
        style={styles.actorImage}
        alt=""
      />
    );
  return (
    <>
      {/* <div>
        <p>
          Actor state: {actorState}
          <br />
        </p>
      </div> */}
      <div style={styles.stageContainer}>{actorDisplay}</div>
    </>
  );
};

export default ActorStagePage;
