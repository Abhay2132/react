import "./buttons.css";
import "./input.css"
import { useEffect, useState, useRef } from "react";
export function Input({ style = {}, placeholder = "", icon, name, inputHandler, refhook, remove, url, index, mode = "dark" }) {
	icon = "/icons/" + (icon || "url.svg");
	let [u, setu] = useState("")

	function handleInput(e) {
		inputHandler && inputHandler(e.target.value, index);
		setu(e.target.value)
	}
	useEffect(() => {
		setu(url || "");
		refhook.current.focus();
	}, [url]);

	refhook = refhook || useRef();

	function removeHandler() {
		remove && remove(index, input.current.value.length < 1)
		setu("")
	};
	return (<div style={style} className="iconed-input-box" mode={mode}>
				<img src={icon} height='30px' width='30px' className="input-icon" alt="url"/>
				<input ref={refhook} type="text" data-index={index} name={name} value={u} onInput={handleInput} placeholder={placeholder} />
				<img src="/icons/delete.svg"  height='30px' width='30px' className="input-icon" alt="delete" style={{opacity:0.2}} onClick={removeHandler} />
		</div>)
}

export function Button({ children,color, bg, onClick=(()=>{}), text = "Button", padding, size,cursor}) {
	return (<button onClick={onClick} className="submit-button" style={{padding: padding, fontSize : size,color : color, background : bg, cursor:cursor}}>
			{children}
		</button>)
}

export function Option ({children,state, onClick, bg,color, text="", margin="5px"}) {
	return (
		<button state={state} onClick={onClick} className="option" style={{margin: margin, color : color, background : bg}}>
			{children || text}
		</button>)
}