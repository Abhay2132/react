import "./main.css"
import { memo, useRef, useState, useEffect } from "react"
import { Editable, Switch, SimpleButton, Button, Input } from "../../ui/form/views"

import NBPanel from "./newBookPanel"
import Book from "./book";
import SettingPanel from "./setting"
import Editor from "./editor.md.jsx"
import {getBooks, getBook, updateBook, deleteBook} from "./api"

export default function Component ({loadid}) {
	window.getData = () => console.log(data)
	const [data, setData] = useState({
		openSettingPanel: false,
		mode: "dashboard" || "editor" ,
		openNBPanel: false,
		newBookData: { name: "", desc: "" },
		books: getBooks(1),
		bookID: "",
		openSetting(id) { 
			history.replaceState({id, type:"setting"}, null , null);
			history.pushState(null, null, "/notebook?setting="+id);
			// history.pushState({BookID: id} , id, "/notebook?setting="+id);
			setData({ ...data, bookID: id, openSettingPanel: true }) 
		},
		openBook(id) {
			history.replaceState({type:"editor", id}, null, null)
			history.pushState(null, null, `/notebook/${id}`)
			setData({ ...data, mode: "editor", bookID: id }) 
		},
		openNBP() {
			history.replaceState({type:"new"}, null, null)
			history.pushState(null, null, `/notebook/new`)
			setData({ ...data, openNBPanel : true }) 
		},
		update: false
	});

	window.getData = ()=> console.log(data);

	const [dbBooks, setDbBooks] = useState([]);

	useEffect(() => {
		document.title = "NoteBook"
		document.querySelector("#logo").textContent = "NoteBook";
		setDbBooks(getBooks(1));
		// console.log("useEffect main", {loadid})

		let params = new URL(document.location).searchParams;
		if(params.has("setting")) setData({...data, bookID : params.get("setting"), openSettingPanel: true})
		// console.log({params})

		let bookID = location.href.split("/").at(-1).split("?")[0]
		if(!!bookID) {
			if(bookID == "notebook") return;
			if(bookID == "new") return setData({...data, openNBPanel:true})

			let book = getBook(bookID)
			if(!book) return history.replaceState(null, null, '/notebook')
			setData({...data,  bookID, mode: "editor"})
		}

		if(!!document.querySelector("#markdown-css")) return;
		let link=document.createElement("link")
		link.setAttribute("id", "markdown-css")
		link.setAttribute("rel", "stylesheet")
		link.setAttribute("href", "/github-markdown.css");
		document.head.appendChild(link);

	}, [])

	function addBook(name, desc) {
		if (!name.trim()) return;
		let books = getBooks();
		books.push({ name, desc, text: "", lastM: Date.now(), id: Math.random().toString(36).slice(2) });
		localStorage.setItem("notebooks", JSON.stringify(books));
		books = null;
		setData({ ...data, books: getBooks(1), openNBPanel: false })
		setDbBooks(getBooks(1))
		console.log("setDashBoard Books")
	}

	let oldH = window.onpopstate
	function popHandler(e){		let state = e?.state
		if(!state) return //console.log(e)

		if(state?.type == "editor") return setData({...data, mode : "dashboard"})
		if(state?.type == "setting") return setData({...data, openSettingPanel:false})
		if(state?.type == "new") return setData({...data, openNBPanel:false});

	}
	window.onpopstate = e => popHandler(e)

	return (<div id="notebook-box" mode={data.mode}>

			<div id="nb-dashboard">
				{dbBooks.map(({name, desc, lastM, id}, i)=> {
					return (
						<Book 
							name={name} 
							desc={desc} 
							lastM={lastM} 
							key={i} 
							onOpen={data.openBook} 
							onSetting={data.openSetting}
							id={id}
						/>
					)
				})}

				<div id="new-book-btn" className="middle-H" 
					onClick={data.openNBP}
				>
					<div id="nb-plus"><hr/><hr/></div>
					<div id="nb-text"> New Book </div>
				</div>

				<NBPanel 
					close={!data.openNBPanel}
					onClose={()=>{
						if(data.openNBPanel) history.back();
						setData({...data, openNBPanel: false});
					}} 
					onDone={({name, desc})=>{
						if(data.openNBPanel) history.back();
						addBook(name, desc)
					}}  
				/>

				<SettingPanel id={data.bookID} 
					close={!data.openSettingPanel} 
					onClose={()=>{
						if(data.openSettingPanel) history.back();
						setData({...data, openSettingPanel: false})
					}}
					onDone={ ()=>{
						if(data.openSettingPanel) history.back();
						setData({...data, openSettingPanel: false, update: !data.update})
						setDbBooks(getBooks(1))
					}}
				/>

			</div>

			<Editor update={data.update} bookID={data.bookID} 
				onBack ={()=> {
					console.log("Editor.onBack")
					history.back()
					setData({...data, mode:"dashboard", update:true})
				}}
			/>

		</div>)
}


