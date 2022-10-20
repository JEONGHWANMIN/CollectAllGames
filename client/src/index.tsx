import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { reset } from "./style/style";
import "./style/fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <Global styles={reset} />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
