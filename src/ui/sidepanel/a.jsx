import {Link} from "react-router-dom"

export default function ({ icon, href, text, cn }) {
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
