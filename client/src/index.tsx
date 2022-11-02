import React from "react";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { reset } from "./style/style";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/router";
import { UserProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/fonts.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Global styles={reset} />
        <RouterProvider router={router} />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
