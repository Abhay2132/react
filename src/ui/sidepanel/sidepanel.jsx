import { useState } from "react";
import A from "./a.jsx";

import "./sidepanel.css";

const itemD = [
  ["/", "home", "Home", "spi side-panel-item"],
  ["/", "contact1", "Contact Me", "side-panel-item"],
  ["/", "about", "About", "side-panel-item"],
];

const items = itemD.map(([href, icon, text, cn], i) => (
  <A key={i} href={href} icon={icon} text={text} cn={cn} />
));

export default function () {
  const [spc, setspc] = useState("side-panel-x");
  window.setspc = setspc;
  return (
    <ul className={spc} id="side-panel">
      {items}
    </ul>
  );
}
