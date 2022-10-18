import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { reset } from "./style/style";
import "./style/fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Global styles={reset} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
