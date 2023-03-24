import "./buttons.css";
import "./input.css"
import { useEffect, useState, useRef } from "react";
export function Input({ value, imp, style = {}, placeholder = "", icon, name, inputHandler, refhook, remove, url, index, mode = "dark" }) {
	icon = "/icons/" + (icon || "url.svg");
	let [v, setv] = useState("")

	function handleInput(e) {
		inputHandler && inputHandler(e.target.value, index);
		setv(e.target.value)
	}
	useEffect(() => {
		setv(value || url || "");
		refhook.current.focus();
	}, [url, value]);

	refhook = refhook || useRef();

	function removeHandler() {
		remove && remove(index, input.current.value.length < 1)
		setv("")
	};
	return (<div style={style} className="iconed-input-box" mode={mode}>
				<img src={icon} height='30px' width='30px' className="input-icon" alt="url"/>
				<input important={imp ? "true" :"false"} ref={refhook} type="text" data-index={index} name={name} value={v} onInput={handleInput} placeholder={placeholder} />
				<img src="/icons/delete.svg"  height='30px' width='30px' className="input-icon" alt="delete" style={{opacity:0.2}} onClick={removeHandler} />
		</div>)
}

export function Button({ children,color, bg, onClick=(()=>{}), text = "Button", padding, size,cursor, style}) {
	return (<button onClick={onClick} className="submit-button" style={style || {padding: padding, fontSize : size,color : color, background : bg, cursor:cursor}}>
			{children || text}
		</button>)
}

export function Option ({children,state, onClick, bg,color, text="", margin="5px"}) {
	return (
		<button state={state} onClick={onClick} className="option" style={{margin: margin, color : color, background : bg}}>
			{children || text}
		</button>)
}

export function LabeledInput ({label, placeholder, refhook, style, onInput}) {

	let [u, setu] = useState("")

	function handleInput(e) {
		onInput(e.target.value);
		setu(e.target.value)
	}

	return(
		<div className="label-input">
			<label style={style} >{label}</label>
			<input className="lable-input" placeholder={placeholder}  value={u} onInput={handleInput}/>
			<img onClick={()=>setu("")} src="/icons/delete.svg"  height='30px' width='30px' className="input-icon" alt="delete" style={{opacity:0.2}} />
		</div>
	)
}

export function SimpleButton ({onClick, value, children, style ={} }){
	return (<button className="simple-button" style={style} onClick={onClick} >
		{value || children}
	</button>)
}

export function Switch ({state, value, style, onClick}){
	return(
		<button state={state} onClick={onClick} className ="switch" style={style}>{value}</button>
	)
}