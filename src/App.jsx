import React , {Suspense, lazy} from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
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

const element = (Element) => {
  return (
    <Suspense fallback={Loader()} >
        <Element/>
    </Suspense>
  )
}

const a = (path, el) => ({path, element : element(el)})

const router = createBrowserRouter([
  {
    path: "/", 
    element: element(Root),
    errorElement: element(ErrorPage),
    children: [
      a("", Index),
      a("imgD", ImgD),
      a("ytdl", YTDL),
      a("notebook", NoteBook),
      a("notebook/*", NoteBook),
      a("about", About),
      a("settings", Settings),
      a("login", Login),
      a("signup", SignUp),
      a("reset", Reset)
    ],
  },
]
,{basename:"/react"}
);

export default function App (){
  return(
 <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
}