import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRouteLoaderData } from "react-router-dom";
import actorStates from "../constants/actorStates";
import getActorImage from "../functions/misc/getActorImage";

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

const socketURL = "ws://localhost:8080";

const PerformerStagePage = () => {
  // Load the actor hash based on the URL
  // Connect a websocket to the bot
  // Listen for updates from the bot

  const [performer, setPerformer] = React.useState(
    useRouteLoaderData("performerStage")
  );
  const [actorState, setActorState] = React.useState(actorStates.GONE);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketURL, {
    onOpen: () => {
      console.log("Websocket connection established.");
      sendJsonMessage({ type: "ACTOR", actorId: performer.discord_snowflake });
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
  console.log(performer);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  let actorDisplay =
    actorState === actorStates.GONE
      ? null
      : getActorImage(performer, actorState);
        // <img
        //   src={getActorImage(performer, actorState)}
        //   style={styles.actorImage}
        //   alt=""
        // />
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

export default PerformerStagePage;
