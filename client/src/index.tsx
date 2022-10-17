import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global } from "@emotion/react";
import { reset } from "./style/reset";
import "./style/fonts.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Global styles={reset} />
    <App />
  </React.StrictMode>
);
