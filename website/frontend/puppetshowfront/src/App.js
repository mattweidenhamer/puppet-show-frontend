import "./App.css";
import LandingPage from "./pages/LandingPage";
import ListScenePage from "./pages/ListScenePage";
import AddBotPage from "./pages/AddBotPage";
import SpecificScenePage from "./pages/SpecificScenePage";
import SpecificActorPage from "./pages/SpecificActorPage";
import ActorStagePage from "./pages/ActorStagePage";
import {
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import getActorFromBackend from "./functions/loaders/getActorFromBackend";
import getAllScenesFromBackend from "./functions/loaders/getAllScenesFromBackend";
import getSceneFromBackend from "./functions/loaders/getSceneFromBackend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [],
  },
  { path: "/bot", element: <AddBotPage /> },
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

  {
    path: "/scenes/:sceneID/actors/:actorId",
    element: <SpecificActorPage />,
    loader: async ({ params }) => {
      return getActorFromBackend(params);
    },
  },
  {
    path: "/stage/:actorId",
    element: <ActorStagePage />,
    loader: async ({ params }) => {
      return getActorFromBackend(params);
    },
  },
]);

//TODO API calls can be done in the specific routes themselves, figure out how to
// acces their loader information
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
