import "./styles/globals.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { Guides } from "./components/Guides/Guides.jsx";
import App from "./App.jsx";
import { PlayerOne } from "./views/PlayerOne/PlayerOne.jsx";
import { PlayerTwo } from "./views/PlayerTwo/PlayerTwo.jsx";
import { PlayerThree } from "./views/PlayerThree/PlayerThree.jsx";
import { PlayerFour } from "./views/PlayerFour/PlayerFour.jsx";
import { About } from "./components/About/About.jsx";
// import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
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
        path: "main",
        element: <Main />,
        children: [
          { index: true, element: <PlayerOne /> },
          { path: "one", element: <PlayerOne /> },
          { path: "two", element: <PlayerTwo /> },
          { path: "three", element: <PlayerThree /> },
          { path: "four", element: <PlayerFour /> },
        ],
      },
      {
        path: "guides",
        element: <Guides />,
        children: [
          {
            path: ":companySlug",
            element: <Guides />,
            children: [
              {
                path: ":deviceSlug",
                element: <Guides />,
                children: [
                  {
                    path: ":guideSlug",
                    element: <Guides />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
