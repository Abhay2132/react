import React , {Suspense, lazy} from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Loader  from "./ui/panels/loader"

const Root = lazy(()=>import("./routes/root"))
const ErrorPage = lazy(()=>import("./error"))
const ImgD = lazy(()=>import("./routes/imgD"))
const Index = lazy(()=>import("./routes/index"))
const YTDL = lazy(()=>import("./routes/ytdl"))
const NoteBook = lazy(()=>import("./routes/notebook/notebook"))
const Settings = lazy(()=>import("./routes/settings/settings"))
const About = lazy(()=> import("./routes/about"))
const Login = lazy(()=>import("./routes/user/login"));
const SignUp = lazy(()=>import("./routes/user/signup"));
const Reset = lazy(()=> import("./routes/user/reset"));

const element = (Component) => {
  return (
    <Suspense fallback={Loader()} >
        <Component/>
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Root />,
    element: element(Root),
    errorElement: element(ErrorPage),
    children: [
      {
        path: "ytdl",
        element: element(YTDL) ,
      },
      {
        path: "imgD",
        element: element(ImgD) ,
      },
      {
        path:"notebook",
        element: element(NoteBook) ,
      },
      {
        path:"notebook/*",
        // loader: getBookID,
        // element : <NoteBook isChild={true} />
        element: element(NoteBook) ,
      },
      {
        path:"settings",
        element: element(Settings) ,
      },
      {
        path: "",
        element: element(Index) ,
      },
      {
        path: "about",
        element : element(About)
      },
      {
        path: "login",
        element: element(Login)
      },
      {
        path: "signup",
        element: element(SignUp)
      },
      {
        path: "reset",
        element: element(Reset)
      }
    ],
  },
]);

export default function App (){
  return(
 <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
}

