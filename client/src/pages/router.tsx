import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { getCookie } from "src/utils/cookie";
import Detail from "./Detail";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Write from "./Write";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "detail/:id",
    element: <Detail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/write",
    element: <Write />,
    loader: () => {
      if (!getCookie("accessToken") || !getCookie("refreshToken")) {
        return redirect("/login");
      }
    },
  },
]);
