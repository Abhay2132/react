import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error";
import ImgD from "./routes/imgD"
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "imgD",
        element: <ImgD/>,
      },
      {
        path: "",
        element: <Index/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

function setH() {
  let h = window.innerHeight + "px";
  document.documentElement.style.setProperty("--innerH", h);
}
setH();
window.onresize = setH;