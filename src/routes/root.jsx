import "../ui/themes/global.css"
import "../App.css";
import "./css/root.css";
import { Outlet , Link } from "react-router-dom";
import { useState , useRef , memo} from "react";

import home from "../assets/icons/home.svg"; 
import about from "../assets/icons/about.svg";
import settings from "../assets/icons/setting.svg";

import User from "./user/user"

export default function () {
  let ai =0;
  itemD.forEach((item,i)=> {if(location.pathname.startsWith(item[0])) ai = i})
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(ai);
 
  const e = useRef((e)=>{
    setOpen(false)
    let {target} = e
    if(target.tagName.toLowerCase() !== "a") target = target.parentNode;
    setActive(target.getAttribute("data-index"));
  });

  const items = itemD.map(([href, icon, text, cn], i) => (
        <A 
          key={i} 
          href={href} 
          icon={icon} 
          text={text} 
          cn={cn} 
          onClick={e.current} 
          active={active == i}
          index={i}
        />
    )
  ); 
  
  return ( <>
    <nav>
      <div className={open  ? "hmbgr-x" : "hmbgr"} onClick={()=> setOpen(!open) } id="hmbgr"><hr /><hr /><hr /></div>
      <div id="logo">Apps</div>
      <User/>
    </nav>
    < div className={open ? "side-panel" : "side-panel-x"} id="side-panel">
      {items}
    </div>
    < main id = "outlet"><Outlet/> </main> 

    </>);
}
 
 const A = memo(function ({ icon, href, text, cn, onClick, active, index }) {
  return (
    <Link to={href} className={cn} onClick={onClick} active={""+active} data-index={index} >
      <img src={icon} /> <span>{text}</span>
    </Link>    
)
});

const itemD = [
    ["/", home, "Home", "side-panel-item"],
    ["/about", about, "About", "side-panel-item"],
    ["/settings", settings, "Settings", "side-panel-item"]
  ];

  const aa = (url) => location.pathname.startsWith(url)
  function  isLogin (params) {
    // console.log(aa("/login"), aa("/signup"))
    if(aa("/login")) return true;
    if(aa("/signup")) return true;
    return false;
  }