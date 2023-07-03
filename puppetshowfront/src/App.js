import "./App.css";
import LandingPage from "./pages/meta/LandingPage";
import ListScenePage from "./pages/ListScenePage";
import SpecificScenePage from "./pages/SpecificScenePage";
import SpecificOutfitPage from "./pages/SpecificOutfitPage";
import PerformerStagePage from "./pages/PerformerStagePage";
import UserInfoPage from "./pages/UserInfoPage";
import HowToUsePage from "./pages/meta/HowToUsePage";
import ListPerformerPage from "./pages/ListPerformerPage";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import getOutfitFromBackend from "./functions/loaders/outfits/getOutfitFromBackend";
import getPerformerFromBackend from "./functions/loaders/performers/getPerformerFromBackend";
import getAllPerformersFromBackend from "./functions/loaders/performers/getAllPerformersFromBackend";
import getSceneFromBackend from "./functions/loaders/scenes/getSceneFromBackend";
import getAllScenesFromBackend from "./functions/loaders/scenes/getAllScenesFromBackend";
import getUserFromBackend from "./functions/loaders/users/getUserFromBackend";
import ConnectDiscordPage from "./pages/meta/ConnectDiscordPage";
import DashboardPage from "./pages/meta/DashboardPage";
import getActiveSceneFromBackend from "./functions/loaders/scenes/getActiveSceneFromBackend";
import getStageFromBackend from "./functions/loaders/stage/getStageFromBackend";
import ErrorPage from "./pages/meta/ErrorPage";
import ImportantInformationPage from "./pages/meta/ImportantInformationPage";
import defaultAPICallbackGen from "./functions/callbacks/defaultAPICallbackGen";
import loadAllPerformersCallback from "./functions/callbacks/loadAllPerformersCallback";

const checkUserInLocal = async () => {
  if (localStorage.getItem("user") === null) {
    return false;
  }
  return true;
};

const updateUserFromBackend = async (
  token,
  force,
  callback = defaultAPICallbackGen(null)
) => {
  if (force) {
    const user = await getUserFromBackend(token, callback);
    if (user !== null) {
      console.debug("Updating user");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("timeSinceLastUpdate", Date.now());
    } else {
      localStorage.removeItem("user");
      console.log("Received null user from callback");
      throw new Error("Received null user");
    }
  } else {
    if (
      localStorage.getItem("timeSinceLastUpdate") === null ||
      Date.now() - localStorage.getItem("timeSinceLastUpdate") >
        1000 * 60 * 60 * 8
    ) {
      const user = await getUserFromBackend(token, callback);
      if (user !== null) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("timeSinceLastUpdate", Date.now());
      } else {
        localStorage.removeItem("user");
        console.log("Received null user");
        throw new Error("Received null user");
      }
    } else {
      console.log("Update was recent, not updating user.");
    }
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/connectDiscord",
    element: <ConnectDiscordPage />,
    errorElement: <ErrorPage />,
    id: "connectDiscord",
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
    id: "dashboard",
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/connectDiscord");
      }
      const active_scene = await getActiveSceneFromBackend(
        token,
        defaultAPICallbackGen(null)
      );
      if (checkUserInLocal()) {
        console.log("Found user in local storage");
        await updateUserFromBackend(token, false);
      } else {
        console.log("User not found in local storage");
        await updateUserFromBackend(token, true);
      }
      return { active_scene: active_scene };
    },
  },
  {
    path: "/scenes",
    id: "allScenes",
    element: <ListScenePage />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const scenes = await getAllScenesFromBackend(
        token,
        defaultAPICallbackGen(null)
      );
      return scenes;
    },
  },
  {
    path: "/scenes/:sceneId",
    element: <SpecificScenePage />,
    errorElement: <ErrorPage />,
    id: "specificScene",
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const scene = await getSceneFromBackend(
        token,
        params.sceneId,
        defaultAPICallbackGen(null)
      );
      const performers = await getAllPerformersFromBackend(
        token,
        defaultAPICallbackGen(null)
      );
      return { scene: scene, performers: performers };
    },
  },
  // {
  //   path: "/scenes/:sceneId/outfits",
  //   element: <ListOutfitPage />,
  //   loader: async ({ params }) => {
  //     return getAllOutfitsFromBackend(params);
  //   },
  // },
  {
    path: "/outfits/:outfitId",
    element: <SpecificOutfitPage />,
    errorElement: <ErrorPage />,
    id: "specificOutfit",
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const outfit = await getOutfitFromBackend(
        token,
        params.outfitId,
        defaultAPICallbackGen(null)
      );
      //TODO may not need Scene
      const scene = await getSceneFromBackend(
        token,
        outfit.scene,
        defaultAPICallbackGen(null)
      );
      const performer = await getPerformerFromBackend(
        token,
        outfit.performer,
        defaultAPICallbackGen(null)
      );
      return { outfit: outfit, scene: scene, performer: performer };
    },
  },
  {
    path: "/stage/:performerId",
    element: <PerformerStagePage />,
    errorElement: <ErrorPage />,
    id: "performerStage",
    loader: async ({ params }) => {
      console.log(params);
      console.log(params.performerId);
      const stage = await getStageFromBackend(
        params.performerId,
        defaultAPICallbackGen(null)
      );
      return stage;
    },
  },
  {
    path: "/receive-token/",
    errorElement: <ErrorPage />,
    loader: async ({ request }) => {
      //Set the received token in the localstorage
      const url = new URL(request.url);
      const token = url.searchParams.get("token");
      localStorage.setItem("token", token);
      const user = await getUserFromBackend(token);
      if (user === null) {
        //Redirect to error logging in page
        return redirect("/error");
      }
      localStorage.setItem("user", user);
      return redirect("/dashboard");
    },
  },
  {
    path: "/user",
    element: <UserInfoPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      //Update the stored user

      const token = localStorage.getItem("token");
      if (token === null) {
        localStorage.clear();
        return redirect("/connectDiscord");
      }
      if (!checkUserInLocal()) {
        updateUserFromBackend(token);
        if (checkUserInLocal() === false) {
          return redirect("/connectDiscord");
        }
      }
      return null;
    },
  },
  {
    path: "/performers",
    element: <ListPerformerPage />,
    errorElement: <ErrorPage />,
    id: "allPerformers",
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/connectDiscord");
      }
      return getAllPerformersFromBackend(token, loadAllPerformersCallback);
    },
  },
  {
    path: "/howToUse",
    element: <HowToUsePage />,
    errorElement: <ErrorPage />,
  },
  // TODO add this page
  {
    path: "/importantInformation",
    element: <ImportantInformationPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
