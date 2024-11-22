import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { UserProvider } from "./user/UserProvider";

const Session: React.FC = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Session />,
    children: [
      {
        children: [
          { index: true, element: <App /> },
          {
            path: "about",
            element: <div>hello</div>,
          },
        ],
      },
    ],
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
