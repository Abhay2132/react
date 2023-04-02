import "./buttons.css";
import "./input.css"
import { useEffect, useState, useRef } from "react";

import delIcon from "../../assets/icons/delete.svg"
import url1 from "../../assets/icons/url.svg"
import edit from "../../assets/icons/edit.svg"
import tick from"../../assets/icons/tick.svg";

export function Input({ value, imp, style = {}, placeholder = "", icon=url1, name, inputHandler, refhook, remove, url, index, mode = "dark" }) {
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
		remove && remove(index, v.length < 1)
		setv("")
	};
	return (<div style={style} className="iconed-input-box" mode={mode}>
				<img src={icon} height='30px' width='30px' className="input-icon" alt="url"/>
				<input important={imp ? "true" :"false"} ref={refhook} type="text" data-index={index} name={name} 
				value={v} onInput={handleInput} placeholder={placeholder} />
				<img src={delIcon} height='30px' width='30px' className="input-icon" alt="delete" 
				style={{opacity:0.2}} 
				onClick={removeHandler} />
		</div>)
}

export function Button({value, children,color, bg, onClick=(()=>{}), text = "Button", padding, size,cursor, style}) {
	return (<button onClick={onClick} className="submit-button" style={style || {padding: padding, fontSize : size,color : color, background : bg, cursor:cursor}}>
			{children || text || value}
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

export function Editable ({label, value, placeholder, icon, onEdit, disabled,id}){
	const [data, setData] = useState({
		disabled: disabled,
		value: value || ""
	})

	useEffect(()=>{
		if(!data.disabled) {
			ref.current.focus();
			setTimeout(()=>ref.current.scrollIntoView(true), 100);
		}
		if(data.disabled) onEdit && onEdit(data.value);
	}, [data.disabled])
		
	useEffect(()=>{
		setData({...data, value})
	}, [value]);

	let ref = useRef();
	return (
		<div className="editable">
			<label>{label}</label>
			<div disable={data?.disabled?.toString()+""} >
				<input 
					ref={ref} 
					onChange={(e)=>setData({...data, value : e.target.value})} 
					placeholder={placeholder}
					disabled={data.disabled} 
					value={data.value} 
				/>
				<img 
					src={data.disabled?edit: tick} 
					onClick={()=>setData({...data, disabled: !data.disabled})} 
				/>
			</div>
		</div>
	)
}

export function Input1 ({type="text",label, onInput, placeholder, value, onClear}){
	const [data, setData] = useState(value)
	function input (e){
		setData(e.target.value);
		onInput && onInput(e.target.value);
	}

	function clear (){
		setData("");
		onInput && onInput("")
		onClear && onClear();
	}

	return (
		<div className="input1">
			<label>{label}</label>
			<div>
				<input value={data} placeholder={placeholder} onInput={input} type={type} />
				<img src={delIcon} onClick={clear} />
			</div>
		</div>
	)
}