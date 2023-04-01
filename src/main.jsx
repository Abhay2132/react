import ReactDOM from "react-dom/client";
import {Suspense, lazy} from "react";
import Loader  from "./ui/panels/loader"

const App = lazy(()=> import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={Loader()} ><App/></Suspense>
)

function setH() {
  let h = window.innerHeight + "px";
  document.documentElement.style.setProperty("--innerH", h);
}
setH();
window.onresize = setH;
