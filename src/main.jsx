import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Info from "./components/Info.jsx";
import Videos from "./components/Videos.jsx";
import Posters from "./components/Posters.jsx";
import { LightProvider } from "./context/LightProvider.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Info />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/posters",
        element: <Posters />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LightProvider>
      <RouterProvider router={router} />
    </LightProvider>
  </StrictMode>
);
