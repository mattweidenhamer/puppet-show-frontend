import "./App.css";
import LandingPage from "./pages/meta/LandingPage";
import ListScenePage from "./pages/ListScenePage";
import AddBotPage from "./pages/meta/AddBotPage";
import SpecificScenePage from "./pages/SpecificScenePage";
import SpecificOutfitPage from "./pages/SpecificOutfitPage";
import PerformerStagePage from "./pages/PerformerStagePage";
import UserInfoPage from "./pages/UserInfoPage";
import GetStartedPage from "./pages/meta/GetStartedPage";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
    loader: async () => {
      localStorage.clear();
      return {};
    },
  },
  { path: "/bot", element: <AddBotPage /> },
  { path: "/connectDiscord", element: <ConnectDiscordPage /> },
  {
    path: "/scenes",
    id: "allScenes",
    element: <ListScenePage />,
    loader: getAllScenesFromBackend,
  },
  {
    path: "/scenes/:sceneId",
    element: <SpecificScenePage />,
    id: "specificScene",
    loader: async ({ params }) => {
      return getSceneFromBackend(params);
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
    path: "/scenes/:sceneId/outfits/:outfitId",
    element: <SpecificOutfitPage />,
    loader: async ({ params }) => {
      return getOutfitFromBackend(params);
    },
  },
  {
    path: "/stage/:performerId",
    element: <PerformerStagePage />,
    loader: async ({ params }) => {
      return getOutfitFromBackend(params);
    },
  },
  {
    path: "/receive-token/",
    loader: async ({ request }) => {
      //Set the received token in the localstorage
      const url = new URL(request.url);

      const token = url.searchParams.get("token");
      console.log(token);
      localStorage.setItem("token", token);
      const user = await getUserFromBackend(token);
      if (user === null) {
        //Redirect to error logging in page
        return redirect("/error");
      }
      localStorage.setItem("user", user);
      return redirect("/gettingStarted");
    },
  },
  {
    path: "/user",
    element: <UserInfoPage />,
    loader: async () => {
      //Retrieve user information from backend.
      //If the user is not logged in, redirect to the login page.
      const token = localStorage.getItem("token");
      if (token === null) {
        return redirect("/connectDiscord");
      }
      const getUser = await getUserFromBackend(token);
      if (getUser === null) {
        return redirect("/connectDiscord");
      }
      return getUser;
    },
  },
  // {
  //   path: "/performers",
  //   element: <ListPerformersPage />,
  //   loader: async () => {
  //     const token = localStorage.getItem("token");
  //     if (token === null) {
  //       return redirect("/login");
  //     }
  //     return getAllPerformersFromBackend(token);
  //   },
  // },
  {
    path: "/gettingstarted",
    element: <GetStartedPage />,
  },
  // TODO add this page
  {
    path: "/importantInformation",
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
