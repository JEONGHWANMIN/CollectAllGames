import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route } from "react-router-dom";
import Home from "./Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
