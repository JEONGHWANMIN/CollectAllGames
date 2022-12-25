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
import { DialogProvider } from "./context/dialogContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>CAG | 최신 게임 뉴스 SNS</title>
        <link rel="canonical" href="https://www.collectly.site/" />
        <meta property="og:title" content="CAG | 최신 게임 뉴스 SNS" />
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <DialogProvider>
            <Global styles={reset} />
            <RouterProvider router={router} />
          </DialogProvider>
        </UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
