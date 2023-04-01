import {useState, useEffect , useRef} from "react"

import "./panels.css"

export function PopupPanel ({id,close , onClose, title, children, footer, onDone=(()=>{}) , debug,yes="Done", no="Cancel"}){
	const [data, setData] = useState({id, close : close, animate : "close", display : "none"})
	//console.log(data.close, close)
	useEffect(()=>{
		let redFlag = false;
		//console.log("useEffect : ", data.close, "\nredFlag :", redFlag);
		setData({...data , animate : "close" , display : "flex" });
		if(!data.close) setTimeout(()=>{
			if(redFlag || data.close) return; 
			setData({animate: "open"});
		}, 0);
		setTimeout(()=>{
			if(redFlag || ! data.close ) return;
			//console.log({data});
			setData({...data, display: "none"});
		}, 400);
		
		if(wasOpened.current && data.close) onClose && onClose();
		if(!wasOpened.current) wasOpened.current = ! data.close
		return () => { redFlag = true }
	},[data.close])
	
	useEffect(() =>  setData({...data, close}), [close]);
	const wasOpened = useRef(false)
	const triggerClose = ()=>setData({ ...data, close : true})

	return (
		<div id={id} className="popup-panel middle" panel-state={data.animate} style={{display : data.display}}>
			<div className="popup-panel-bg" 
				onClick={triggerClose}
			></div> 
			<div className="popup-panel-body" >
				<div className="popup-panel-topbar">
					<div className="popup-panel-title">{title}</div>
					<div className="popup-panel-close-btn"
						onClick={triggerClose}
					><hr/><hr/></div>
				</div>
				<div className="popup-panel-body-main">
					{children}
				</div>

			<div className="popup-panel-footer">
				<div className="popup-panel-footer-text">{footer}</div>
				<button className="popup-panel-cancel" onClick={triggerClose}>{no}</button>
				<button className="popup-panel-ok" onClick={onDone} >{yes}</button>
			</div>
			</div>
		</div>
	)
}
