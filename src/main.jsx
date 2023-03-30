import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";
import ErrorPage from "./error";
import ImgD from "./routes/imgD"
import Index from "./routes/index";
import YTDL from "./routes/ytdl"
import NoteBook from "./routes/notebook/notebook"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "ytdl",
        element: <YTDL/>,
      },
      {
        path: "imgD",
        element: <ImgD/>,
      },
      {
        path:"notebook",
        element: <NoteBook/>
      },
      {
        path:"notebook/*",
        // loader: getBookID,
        element : <NoteBook isChild={true} />
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