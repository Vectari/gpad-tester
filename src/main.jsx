import "./styles/globals.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { Info } from "./components/Info/Info.jsx";
import App from "./App.jsx";
import { PlayerOne } from "./views/PlayerOne/PlayerOne.jsx";
import { PlayerTwo } from "./views/PlayerTwo/PlayerTwo.jsx";
import { PlayerThree } from "./views/PlayerThree/PlayerThree.jsx";
import { PlayerFour } from "./views/PlayerFour/PlayerFour.jsx";
import { About } from "./components/About/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <>
            <Main />
            <PlayerOne />
          </>
        ),
      },
      {
        path: "/main",
        element: <Main />,
        children: [
          {
            index: true,
            element: <PlayerOne />,
          },
          {
            path: "/main/one",
            element: <PlayerOne />,
          },
          {
            path: "/main/two",
            element: <PlayerTwo />,
          },
          {
            path: "/main/three",
            element: <PlayerThree />,
          },
          {
            path: "/main/four",
            element: <PlayerFour />,
          },
        ],
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
