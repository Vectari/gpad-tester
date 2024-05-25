import "./styles/globals.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main/Main.jsx";
import { Info } from "./components/Info/Info.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/main",
        element: <Main />,
      },
      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
