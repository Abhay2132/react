import React , {Suspense, lazy}from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import Root from "./routes/root";
// import ErrorPage from "./error";
// import ImgD from "./routes/imgD"
// import Index from "./routes/index";
// import YTDL from "./routes/ytdl"
// import NoteBook from "./routes/notebook/notebook"
// import Settings from "./routes/settings/settings"
import { FullLoader} from "./ui/panels/main"

const element = (path) => {
  let Component = lazy(()=> import(path) )
  return (
    <Suspense callback={FullLoader()} >
        <Component/>
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: element("./routes/root"),
    errorElement: element("./error"),
    children: [
      {
        path: "ytdl",
        element: element("./routes/ytdl") ,
      },
      {
        path: "imgD",
        element: element("./routes/imgD") ,
      },
      {
        path:"notebook",
        element: element("./routes/notebook/notebook") ,
      },
      {
        path:"notebook/*",
        // loader: getBookID,
        // element : <NoteBook isChild={true} />
        element: element("./routes/notebook") ,
      },
      {
        path:"settings",
        element: element("./routes/settings/settings") ,
      },
      {
        path: "",
        element: element("./routes/index") ,
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
