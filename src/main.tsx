import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

import { ReactRouterTestDemo } from "~ReactRouterTestDemo";

import { App } from "./App";

import "./main.css";
import "./styles.scss";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col gap-2">
        <Link to="/demo-1">Demo 1</Link>
        <Link to="/demo-2/2">Demo 2</Link>
      </div>
    ),
  },
  {
    path: "/demo-1",
    element: <App />,
  },
  {
    path: "/demo-2/:pageId",
    element: <ReactRouterTestDemo />,
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
