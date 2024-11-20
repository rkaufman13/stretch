import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: create & add ErrorElement component
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ChakraProvider>
  </React.StrictMode>,
);
