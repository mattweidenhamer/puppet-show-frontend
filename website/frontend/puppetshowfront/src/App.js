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
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  useLoaderData,
  redirect,
} from "react-router-dom";
import getOutfitFromBackend from "./functions/loaders/outfits/getOutfitFromBackend";
import getAllOutfitsFromBackend from "./functions/loaders/outfits/getAllOutfitsFromBackend";
import getPerformerFromBackend from "./functions/loaders/performers/getPerformerFromBackend";
import getAllPerformersFromBackend from "./functions/loaders/performers/getAllPerformersFromBackend";
import getSceneFromBackend from "./functions/loaders/scenes/getSceneFromBackend";
import getAllScenesFromBackend from "./functions/loaders/scenes/getAllScenesFromBackend";
import getUserFromBackend from "./functions/loaders/users/getUserFromBackend";
import ConnectDiscordPage from "./pages/meta/ConnectDiscordPage";
import DashboardPage from "./pages/meta/DashboardPage";
import getActiveSceneFromBackend from "./functions/loaders/scenes/getActiveSceneFromBackend";
import getStageFromBackend from "./functions/loaders/stage/getStageFromBackend";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
    // Debug
    // loader: async () => {
    //   localStorage.clear();
    //   return {};
    // },
  },
  { path: "/connectDiscord", element: <ConnectDiscordPage /> },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    id: "dashboard",
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/connectDiscord");
      }
      const active_scene = await getActiveSceneFromBackend(token);
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
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const scenes = await getAllScenesFromBackend(token);
      return scenes;
    },
  },
  {
    path: "/scenes/:sceneId",
    element: <SpecificScenePage />,
    id: "specificScene",
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const scene = await getSceneFromBackend(token, params.sceneId);
      const performers = await getAllPerformersFromBackend(token);
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
    id: "specificOutfit",
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const outfit = await getOutfitFromBackend(token, params.outfitId);
      //TODO may not need Scene
      const scene = await getSceneFromBackend(token, outfit.scene);
      const performer = await getPerformerFromBackend(token, outfit.performer);
      return { outfit: outfit, scene: scene, performer: performer };
    },
  },
  {
    path: "/stage/:performerId",
    element: <PerformerStagePage />,
    id: "performerStage",
    loader: async ({ params }) => {
      console.log(params);
      console.log(params.performerId);
      const stage = await getStageFromBackend(params.performerId);
      return stage;
    },
  },
  {
    path: "/receive-token/",
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
    loader: async () => {
      //Update the stored user

      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/connectDiscord");
      }
      if (!checkUserInLocal()) {
        updateUserFromBackend(token);
        if (checkUserInLocal() === false) {
          return redirect("/connectDiscord");
        }
      }
    },
  },
  {
    path: "/performers",
    element: <ListPerformerPage />,
    id: "allPerformers",
    loader: async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/login");
      }
      return getAllPerformersFromBackend(token);
    },
  },
  {
    path: "/howToUse",
    element: <HowToUsePage />,
  },
  // TODO add this page
  {
    path: "/importantInformation",
  },
]);

const checkUserInLocal = async () => {
  if (localStorage.getItem("user") === null) {
    return false;
  }
  return true;
};

const updateUserFromBackend = async (token, force) => {
  if (force) {
    const user = await getUserFromBackend(token);
    if (user !== null) {
      console.log("Updating user");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("timeSinceLastUpdate", Date.now());
    } else {
      localStorage.removeItem("user");
      console.log("Received null user");
    }
  } else {
    if (
      localStorage.getItem("timeSinceLastUpdate") === null ||
      Date.now() - localStorage.getItem("timeSinceLastUpdate") >
        1000 * 60 * 60 * 8
    ) {
      const user = await getUserFromBackend(token);
      if (user !== null) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("timeSinceLastUpdate", Date.now());
      } else {
        localStorage.removeItem("user");
        console.log("Received null user");
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
