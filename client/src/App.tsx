/** @jsxImportSource @emotion/react */
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./page/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
