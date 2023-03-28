import "./css/notebook.css"
import { marked } from "marked";
import { memo, useRef, useState, useEffect } from "react"
import { PopupPanel } from "../ui/panels/main"
import { Editable, Switch, SimpleButton, Button, Input } from "../ui/form/views"

import { useLoaderData } from "react-router-dom";

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
		update: false
	})

	const [dbBooks, setDbBooks] = useState([]);

	useEffect(() => {
		document.title = "NoteBook"
		document.querySelector("#logo").textContent = "NoteBook";
		setDbBooks(getBooks(1));
		// console.log("useEffect main", {loadid})

		let params = new URL(document.location).searchParams;
		if(params.has("setting")) setData({...data, bookID : params.get("setting"), openSettingPanel: true})
		// console.log({params})

		if(loadid) {
			let bookID = location.href.split("/").at(-1)
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
	function popHandler(e){
		// console.log("popstate :", e?.state)
		// if(typeof oldH == "function" && oldH.toString() !== popHandler.toString() ) oldH(e);
		
		let state = e?.state
		if(!state) return //console.log(e)

		if(state?.type == "editor") return setData({...data, mode : "dashboard"})
		if(state?.type == "setting") return setData({...data, openSettingPanel:false})
	}

	window.onpopstate = e => popHandler(e)

	return (<div id="notebook-box" mode={data.mode}>

			<div id="nb-dashboard">
				{dbBooks.map(({name, desc, lastM, id}, i)=> {
					return (
						<BookMemo 
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

				<div id="new-book-btn" className="middle-H" onClick={()=>setData({...data, openNBPanel: true})}>
					<div id="nb-plus"><hr/><hr/></div>
					<div id="nb-text"> New Book </div>
				</div>

				<PopupPanel id="new-nb-panel" title="Create New Book" close={!data.openNBPanel} onClose={()=>setData({...data, openNBPanel: false, newBookData: {name: "", desc:""} })} onDone={()=>addBook(data.newBookData.name, data.newBookData.desc)}  >
					<div className="middle" style={{padding: "10px", transform: "scale(0.9)"}}>
						<Book name={data.newBookData.name} desc={data.newBookData.desc} viewOnly={true} />
					</div>
					<form id="new-book-form" className="p">
						<div className="p bdr-b m">Enter Details</div>
						<Input value={data.newBookData.name} imp="1" label="Name" placeholder="NoteBook Name" inputHandler={(d)=>setData({...data, newBookData:{...data.newBookData, name: d} } )} mode="light" />
						<Input value={data.newBookData.desc} label="Description" placeholder="About the Book"  inputHandler={(d)=>setData({...data, newBookData:{...data.newBookData, desc: d} } )} mode="light" />
					</form>
				</PopupPanel>

				<SettingPanel id={data.bookID} 
					close={!data.openSettingPanel} 
					onClose={()=>{
						if(data.openSettingPanel) history.back();
						// console.log("onClose setting")
						setData({...data, openSettingPanel: false})
					}}
					onDone={ ()=>{
						setData({...data, openSettingPanel: false, update: !data.update})
						setDbBooks(getBooks(1))
					}}
				/>

			</div>

			<Editor update={data.update} bookID={data.bookID} 
				onBack ={()=> {
					history.back()
					setData({...data, mode:"dashboard"})
				}}
			/>

		</div>)
}

function Book({ name, desc, lastM, viewOnly, onOpen, onSetting, id }) {
	const [option, setOption] = useState("")

	function toggleOpt(e) {
		if (viewOnly) return;
		setOption(!option);
	}

	function open() {
		onOpen && onOpen(id)
	}

	function setting() {
		onSetting && onSetting(id);
	}
	return (<div bookid={id} className="nb-book" onClick={toggleOpt}>
		<div className="nb-book-name">{name}</div>
		<div className="nb-book-lastEdit">3 min ago </div>
		<div className="nb-book-extra" show-options={option.toString()}>
			<div className="nb-book-desc">{desc.slice(0,40)+(desc.length>40?" ...":"")}</div>
			<div className="nb-book-options">
				<div className="nb-book-option" onClick={open} >OPEN</div>
				{/*<hr/>*/}
				<div className="nb-book-option" onClick={setting} >SETTING</div>
			</div>
		</div>
	</div>)
}
const BookMemo = memo(Book)

function Editor({ bookID, onBack, update }) {
	const defData = { text: "", book: { text: "" }, md: false }
	const [data, setData] = useState(defData);
	useEffect(() => {
		let book = getBook(bookID);
		if (!book) return;
		setData({ ...defData, book, text: book.text || "", md: book.text.trim().length > 0 });
		setMD(book.text || "");
	}, [bookID, update]);
	let ref = useRef();
	let md = useRef();

	function save() {
		let books = getBooks();
		for (let book of books) {
			if (book.id === data.book.id) {
				book.text = data.text;
			}
		}
		localStorage.setItem("notebooks", JSON.stringify(books));
	}
	const setMD = (content) => md.current.innerHTML = marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""));
	return (<div id="editor" mode={data.md ? "md" : "edit"} >
			<div id="editor-top-bar">
				<SimpleButton onClick={onBack} value="Back" style={{margin: "5px 10px", padding: "0 10px", fontSize : "1rem"}} /> 
				<div id="editor-book-name" onClick={()=> console.log({data})} >{data.book?.name}</div>
				<div style={{margin: "5px 10px 0 auto"}} className="middle">
					<Switch state={data.md ? "on" : "off"} value="md" style={{padding: "5px 10px", margin: "0 5px"}} 
					onClick={()=> {setData({...data, md : !data.md}); setMD(ref.current.value); }} />
					<SimpleButton value="Save" style={{padding: "7px 10px", fontSize : "1rem", background: "green" , color: "#fff"}} onClick={save} />
				</div>
			</div>
			<textarea id="editor-body" ref={ref} placeholder="Start Typing Here" 
				onInput={()=> {setData({...data, text: ref.current.value}); } }
				value={data.text} ></textarea>
			<div id="editor-md" className="markdown-body" ref={md}>MARKDOWN</div>
		</div>)
}

function getBooks(noText) {
	let books = JSON.parse(localStorage.getItem("notebooks") || "[]")
	if (books.length < 1) return books;
	if (!noText) return books;
	return books.map(book => {
		delete book.text;
		return book;
	})
}

function getBook(id, previewBook) {
	for (let book of getBooks()) {
		if (book.id === id) {
			if (previewBook) {
				return ({ name: book.name, desc: book.desc })
			}
			return book
		}
	}
	return null;
}

function SettingPanel({ id, close, onClose, onDone }) {
	let book = getBook(id, 1) || { name: "", desc: "" };
	const [data, setData] = useState({ ...book, close, onDone });
	useEffect(() => {
		let book = getBook(id, 1) || { name: "", desc: "" };
		setData({ ...data, close: close, name: book.name || "", desc: book.desc || "", onDone })
	}, [close])
	return (<PopupPanel id="nb-setting" close={data.close}  onClose={onClose} 
		onDone={()=>{ updateBook(id, {name: data.name||"", desc: data.desc||""}); onDone(); } } 
	>
		<div className="middle" style={{padding: "10px", transform: "scale(0.9)"}}>
			<BookMemo name={data.name} desc={data.desc} viewOnly={true} />
		</div>
		<div className="nb-setting-body">
			<h4 onClick={()=>console.log({data})}>Basic Settings</h4>
			<Editable value={data.name} label="Name" disabled={true} onEdit={(value)=> setData({...data, name : value||""}) } />
			<Editable value={data.desc} label="Description" disabled={true}  onEdit={(value)=> setData({...data,desc : value||""}) }/>
		</div>
	</PopupPanel>)
}

function updateBook(id, data) {
	let book = getBook(id);
	console.log({ book, data })
	if (!book) return console.error("update Book : invalid id", { id: id })
	book = { ...book, ...data };
	let books = getBooks()
	for (let i = 0; i < books.length; i++) {
		if (books[i].id === id) {
			books[i] = book;
		}
	}
	localStorage.setItem("notebooks", JSON.stringify(books));
}

export function getBookID({params}){
	// console.log({params})
	return params.bookID;
}
