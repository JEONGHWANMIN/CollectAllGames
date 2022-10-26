import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Detail from "./Detail";
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
  },
]);
