import "../ui/colortheme.css"
import "../App.css";
import { SidePanel, Nav, Main, RightPanel } from "../ui/ui.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <SidePanel />
      <main id="outlet">
        <Outlet/>
      </main>
    </>
  );
}

export default App;
