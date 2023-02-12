import "./ui/colortheme.css"
import "./App.css";
import { SidePanel, Nav, Main, RightPanel } from "./ui/ui.jsx";

function App() {
  return (
    <>
      <Nav />
      <SidePanel />
      <div id="window">
        <Main/>
        <RightPanel/>
      </div>
    </>
  );
}

export default App;
