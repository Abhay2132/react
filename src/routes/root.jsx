import "../ui/themes/global.css"
import "../App.css";
import "./css/root.css";

import { Outlet , Link } from "react-router-dom";
import { useState } from "react";

export default function () {
  const [cls, setcls] = useState("");
  const [spc, setspc] = useState("side-panel-x");

  function clickHandle(e) {
    const isClosed = cls != "hmbgr-x";
    const newcls = isClosed ? "hmbgr-x" : "hmbgr";
    const newspc = isClosed ? "" : "side-panel-x";
    setcls(newcls);
    setspc(newspc);
  }

  const items = itemD.map(([href, icon, text, cn], i) => (
    <A key={i} href={href} icon={icon} text={text} cn={cn} />
  ));
  return ( <>

    <nav>
      <div className={cls} onClick={clickHandle} id="hmbgr"><hr /><hr /><hr /></div>
      <div id="logo">Apps</div>
    </nav>
    < div className={spc} id="side-panel">{items}< /div>
    < main id = "outlet"><Outlet/> < /main> 

    < />);
}
 
function A ({ icon, href, text, cn }) {
  function closeSPanel (){
    setspc("side-panel-x");
    setHmbgrCls("hmbgr")
  }
  return (
    <Link to={href} className={cn} onClick={closeSPanel}>
      <img src={"/icons/" + icon + ".svg"} /> <span>{text}</span>
    </Link>
  );
}

const itemD = [
    ["/", "home", "Home", "spi side-panel-item"],
    ["/", "contact1", "Contact Me", "side-panel-item"],
    ["/", "about", "About", "side-panel-item"],
  ];