import "./css/notebook.css"

import { useRef, useState , useEffect } from "react"
import {PopupPanel } from "../ui/panels/main"
import {LabeledInput,Switch, SimpleButton ,Button ,Input } from "../ui/form/views"

export default function() {

	const [data, setData] = useState({mode: "editor", openNBPanel: false, newBookData:{name:"", desc: ""}, books : getBooks(), bookID : ""})

	useEffect(() => {
		document.title = "NoteBook"
		document.querySelector("#logo").textContent = "NoteBook"
	}, [])

	function addBook (name, desc){
		// console.log({name, d:!name.trim()})
		if(!name.trim()) return ;
		let books = getBooks();
		books.push({name, desc, text: "", lastM : Date.now(), id: Math.random().toString(36).slice(2) });
		localStorage.setItem("notebooks", JSON.stringify(books));
		setData({...data, books: getBooks(), openNBPanel: false})
	}

	return (
		<div id="notebook-box" mode={data.mode}>

			<div id="nb-dashboard">
				{data.books.map(({name, desc, lastM, id}, i)=> <Book name={name} desc={desc} lastM={lastM} key={i} onOpen={()=>setData({...data, mode:"editor", bookID: id})} />)}

				<div id="new-book-btn" className="middle-H" onClick={()=>setData({...data, openNBPanel: true})}>
					<div id="nb-plus"><hr/><hr/></div>
					<div id="nb-text"> New Book </div>
				</div>
			</div>

			<PopupPanel title="Create New Book" close={!data.openNBPanel} onClose={()=>setData({...data, openNBPanel: false, newBookData: {name: "", desc:""} })} onDone={()=>addBook(data.newBookData.name, data.newBookData.desc)}  >
				<div className="middle" style={{padding: "10px", transform: "scale(0.9)"}}>
					<Book name={data.newBookData.name} desc={data.newBookData.desc} viewOnly={true} />
				</div>
				<form id="new-book-form" className="p">
					<div className="p bdr-b m">Enter Details</div>
					<Input value={data.newBookData.name} imp="1" label="Name" placeholder="NoteBook Name" inputHandler={(d)=>setData({...data, newBookData:{...data.newBookData, name: d} } )} mode="light" />
					<Input value={data.newBookData.desc} label="Description" placeholder="About the Book"  inputHandler={(d)=>setData({...data, newBookData:{...data.newBookData, desc: d} } )} mode="light" />

				</form>
			</PopupPanel>

			<Editor bookID={data.bookID} onBack ={()=> setData({...data, mode:"dashboard"})}/>

		</div>
		)
}

function Book({ name , desc, lastM, viewOnly, onOpen, onOption}) {
	const [option, setOption] = useState("")
	function toggleOpt (e){
		if(viewOnly) return;
		setOption(!option);
	}

	return (<div className="nb-book" onClick={toggleOpt}>
		<div className="nb-book-name">{name}</div>
		<div className="nb-book-lastEdit">3 min ago </div>
		<div className="nb-book-extra" show-options={option.toString()}>
			<div className="nb-book-desc">{desc.slice(0,40)+(desc.length>40?" ...":"")}</div>
			<div className="nb-book-options">
				<div className="nb-book-option" onClick={onOpen} >OPEN</div>
				{/*<hr/>*/}
				<div className="nb-book-option" onClick={onOption} >OPTIONS</div>
			</div>
		</div>
	</div>)
}

function Editor({bookID, onBack}){
	const defData = {text:"", book : {text :""}, md: false}
	const [data, setData] = useState(defData);
	useEffect(()=> {
		let book = getBook(bookID);
		if(!book) return;
		setData({...defData, book, text : book.text || ""});
		console.log({book})
	},[bookID]);	
	let ref = useRef();

	function save(){
		let books = getBooks();
		for(let book of books){
			if(book.id === data.book.id) {
				book.text = data.text;
			}
		}
		localStorage.setItem("notebooks", JSON.stringify(books));
	}

	return (
		<div id="editor" mode={data.md ? "md" : "edit"} >
			<div id="editor-top-bar">
				<SimpleButton onClick={onBack} value="Back" style={{margin: "5px 10px", padding: "0 10px", fontSize : "1rem"}} />
				<div id="editor-book-name" onClick={()=> console.log({data})} >{data.book?.name}</div>
				<div style={{margin: "5px 10px 0 auto"}} className="middle">
					<Switch state={data.md ? "on" : "off"} value="md" style={{padding: "5px 10px", margin: "0 5px"}} onClick={()=> setData({...data, md : !data.md})} />
					<SimpleButton value="Save" style={{padding: "7px 10px", fontSize : "1rem", background: "green" , color: "#fff"}} onClick={save} />
				</div>
			</div>
			<textarea id="editor-body" ref={ref} placeholder="Start Typing Here" onInput={()=> setData({...data, text: ref.current.value}) } value={data.text} ></textarea>
			<div id="editor-md">MarkDown </div>
		</div>
	)
}

function getBooks (){
	return JSON.parse(localStorage.getItem("notebooks") || "[]")
}

function getBook(id){
	for(let book of getBooks()){
		if(book.id === id) return book
	}
	return null;
}