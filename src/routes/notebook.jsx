import "./css/notebook.css"

import { useState , useEffect } from "react"

export default function() {
	useEffect(() => {
		document.title = "NoteBook"
		document.querySelector("#logo").textContent = "NoteBook"
	}, [])

	return (<div id="notebook-box">
			<div id="nb-dashboard">
				<Book name="Daily Dairy"/>
				<Book name="Daily Dairy"/>
				<Book name="Daily Dairy"/>
			</div>
		</div>)
}

function Book({ name }) {
	const [option, setOption] = useState("")
	function toggleOpt (e){
		console.log(e)
		setOption(!option);
	}

	return (<div className="nb-book">
		<div className="nb-book-name" onClick={toggleOpt}>{name}</div>
		<div className="nb-book-lastEdit">3 min ago </div>
		<div className="nb-book-extra" show-options={option.toString()}>
			<div className="nb-book-desc">India's Facts about Abhay Bisht</div>
			<div className="nb-book-options">
				<div className="nb-book-option">OPEN</div>
				<div className="nb-book-option">OPTIONS</div>
			</div>
		</div>
	</div>)
}