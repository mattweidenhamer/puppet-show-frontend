import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useRouteLoaderData } from "react-router-dom";
import actorStates from "../constants/actorStates.json";
import getActorImage from "../functions/misc/getActorImage";
import PerformanceAnimation from "../components/Display/PerformanceAnimation";

const styles = {
  stageContainer: {
    display: "flex",
    padding: "10px",
    textAlign: "center",
    height: "300px",
    width: "300px",
    // border: "1px solid black",
  },
  actorImage: {
    // position: "absolute",
    // top: "0",
    // left: "0",
    // height: "300px",
    // width: "300px",
    textAlign: "center",
    justify: "center",
    width: "100%",
    height: "100%",
  },
};

const connection_states = {
  [ReadyState.CONNECTING]: "Connecting",
  [ReadyState.OPEN]: "Open",
  [ReadyState.CLOSING]: "Closing",
  [ReadyState.CLOSED]: "Closed",
  [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};

const socketURL = "ws://localhost:8080";

// const PerformerStagePage = () => {
//   // Load the actor hash based on the URL
//   // Connect a websocket to the bot
//   // Listen for updates from the bot

//   const [performer, setPerformer] = React.useState(
//     useRouteLoaderData("performerStage")
//   );
//   const [actorState, setActorState] = React.useState(actorStates.GONE);

//   const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketURL, {
//     onOpen: () => {
//       console.log("Websocket connection established.");
//       sendJsonMessage({ type: "ACTOR", actorId: performer.discord_snowflake });
//       console.log("Sent actor request.");
//     },
//   });

//   useEffect(() => {
//     if (lastMessage !== null) {
//       console.log(lastMessage);
//       const parsedMessage = JSON.parse(lastMessage.data);
//       if (parsedMessage.type === "ACTOR_STATE") {
//         setActorState(parsedMessage.data);
//       }
//     }
//   }, [lastMessage, setActorState]);
//   console.log(performer);

//   const connectionStatus = {
//     [ReadyState.CONNECTING]: "Connecting",
//     [ReadyState.OPEN]: "Open",
//     [ReadyState.CLOSING]: "Closing",
//     [ReadyState.CLOSED]: "Closed",
//     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
//   }[readyState];

//   let actorDisplay =
//     actorState === actorStates.GONE
//       ? null
//       : getActorImage(performer, actorState);
//         // <img
//         //   src={getActorImage(performer, actorState)}
//         //   style={styles.actorImage}
//         //   alt=""
//         // />
//   return (
//     <>
//       {/* <div>
//         <p>
//           Actor state: {actorState}
//           <br />
//         </p>
//       </div> */}
//       <div style={styles.stageContainer}>{actorDisplay}</div>
//     </>
//   );
// };

const PerformerStagePage = () => {
  const [performer, setPerformer] = React.useState(
    useRouteLoaderData("performerStage")
  );
  const [voiceState, setVoiceState] = React.useState(actorStates.GONE);
  const [receivedLastUpdate, setReceivedUpdate] = React.useState(new Date());
  const [animationImages, setAnimationImages] = React.useState(() => {
    let animation_obj = {};
    for (const animation of performer.get_outfit.animations) {
      animation_obj[animation.animation_type] = (
        <img
          src={animation.animation_path}
          key={animation.animation_type}
          alt={animation.animation_type}
        />
      );
      // Set the default connection animation to the not talking animation if it is undefined.
      if (
        animation.animation_type === actorStates.STOP_SPEAKING &&
        animation_obj[actorStates.CONNECTION] === undefined
      ) {
        animation_obj[actorStates.CONNECTION] =
          animation_obj[animation.animation_type];
      }
    }
    return animation_obj;
  });
  //FOR THE FUTURE, use for setting up inverval-based animations such as sleeping, connection, and disconnection.
  // useEffect(() => {
  //   const invervalId = setInterval(() => {
  //     if (
  //       new Date() - receivedLastUpdate > 1000 * 60 * 5 && // 5 minutes
  //       voiceState === actorStates.STOP_SPEAKING
  //     ) {
  //       setVoiceState(actorStates.SLEEPING);
  //     }
  //   }, 5000);
  //   return () => clearInterval(invervalId);
  // }, [receivedLastUpdate, voiceState]);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketURL, {
    onOpen: () => {
      console.log("Websocket connection established.");
      sendJsonMessage({ type: "ACTOR", actorId: performer.discord_snowflake });
      console.log("Sent actor request.");
    },
  });
  useEffect(() => {
    if (lastMessage !== null) {
      const parsedMessage = JSON.parse(lastMessage.data);
      if (parsedMessage.type === "ACTOR_STATE") {
        //Edge case, do not set the result to NOT_SPEAKING if the current state is DISCONNECTION,
        //Otherwise, the actor will be stuck in NOT_SPEAKING
        if (
          voiceState === actorStates.DISCONNECTION &&
          parsedMessage.data === actorStates.STOP_SPEAKING
        ) {
          return;
        }
        // DEBUG
        // console.log(parsedMessage.data);
        setVoiceState(parsedMessage.data);
        setReceivedUpdate(new Date());
      }
    }
  }, [lastMessage, setVoiceState, voiceState, setReceivedUpdate]);

  return (
    <>
      <div style={styles.stageContainer}>{animationImages[voiceState]}</div>
    </>
  );
};

export default PerformerStagePage;
