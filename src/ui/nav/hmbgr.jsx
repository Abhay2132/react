import { useState } from "react";

function Hmbgr() {
  const [cls, setcls] = useState("");
  function clickHandle(e) {
    const isClosed = cls != "hmbgr-x";
    const newcls = isClosed ? "hmbgr-x" : "hmbgr";
    const newspc = isClosed ? "" : "side-panel-x";

    // console.log({newcls})

    setcls(newcls);
    window.setspc(newspc);
  }
  window.setHmbgrCls = setcls;
  return (
    <div className={cls} onClick={clickHandle} id="hmbgr">
      <hr />
      <hr />
      <hr />
    </div>
  );
}

export default Hmbgr;
