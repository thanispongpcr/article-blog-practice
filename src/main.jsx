import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FormComponent from "./components/formComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <FormComponent />,
  },
  {
    path: "/blog/:slug",
    element: <SingleComponent />,
  },
  {
    path: "/blog/edit/:slug",
    element: <EditComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

