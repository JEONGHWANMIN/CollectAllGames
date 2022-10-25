/** @jsxImportSource @emotion/react */
import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Write from "./Write";

export const router = createBrowserRouter([
  {
    path: "/",
    // loader: () => {
    //   const user = "HwanMin";
    //   if (false) {
    //     throw redirect("/login");
    //   }
    //   return user;
    // },
    element: <Home />,
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
  },
]);
