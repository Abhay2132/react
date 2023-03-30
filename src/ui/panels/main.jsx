import {useState, useEffect , useRef} from "react"

import "./panels.css"

export function PopupPanel ({id,close , onClose, title, children, footer, onDone=(()=>{}) , debug,yes="Done", no="Cancel"}){
	// console.log({close})
	const [closePanel, setClosePanel] = useState(close)
	const [panel, setPanel] = useState("open");
	const lastTO = useRef();

	useEffect(()=>{
		animatePanel(close,()=> setClosePanel(close));
		debug && console.log({close})
	},[close])

	// const firstRender = useRef()
	const wasOpened = useRef(false)
	useEffect(()=>{
		// if(!firstRender.current){firstRender.current = true; return;}
		if(!wasOpened.current){
			wasOpened.current = ! closePanel
			return;
		}
		if(!closePanel) return;
		onClose && !onClose() && debug && console.log("panel closed")
	},[closePanel])


	function animatePanel(c, cb){
		clearTimeout(lastTO.current);
		const animationDur = 400;
		if(c){
			setPanel("close")
			lastTO.current = setTimeout(cb, animationDur)
		} else {
			lastTO.current = setTimeout(()=> setPanel("open"), 10)
			cb();
		}
	}
	const triggerClose = ()=>animatePanel(1, ()=>setClosePanel(true));

	return (
		<div id={id} className="panel middle" panel-state={panel} style={{display: closePanel?"none":"flex"}}>
			<div className="panel-bg" 
				onClick={triggerClose}
			></div>
			<div className="panel-body">
				<div className="panel-topbar">
					<div className="panel-title">{title}</div>
					<div className="panel-close-btn"
						onClick={triggerClose}
					><hr/><hr/></div>
				</div>
				<div className="panel-body-main">
					{children}
				</div>

			<div className="panel-footer">
				<div className="panel-footer-text">{footer}</div>
				<button className="panel-cancel" onClick={triggerClose}>{no}</button>
				<button className="panel-ok" onClick={onDone} >{yes}</button>
			</div>
			</div>
		</div>
	)
}