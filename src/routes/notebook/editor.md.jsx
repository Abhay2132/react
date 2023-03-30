import { PopupPanel } from "../../ui/panels/main"
import { Editable, Switch, SimpleButton, Button, Input } from "../../ui/form/views"
import {getBooks, getBook, updateBook, deleteBook} from "./api"
import { marked } from "marked";
import {useState, useEffect, useRef} from "react"

export default function Editor({ bookID, onBack, update }) {
	const defData = { text: "", book: { text: "" }, md: false , savePanel : false }
	const [data, setData] = useState(defData);
	useEffect(() => {
		//console.log("Editor useEffect")
		let book = getBook(bookID);
		if (!book) return;
		setData({ ...defData, book, text: book.text || "", md: book.text.trim().length > 0 });
		book?.text && setMD(book.text, 1);
	}, [bookID, update]);
	let ref = useRef();
	let md = useRef();
	let goBack = useRef();
	let edited = useRef();

	function save(b) {
		let books = getBooks();
		for (let book of books) {
			if (book.id === data.book.id) {
				book.text = data.text;
			}
		}
		localStorage.setItem("notebooks", JSON.stringify(books));

		setData({...data,savePanel : false})
		if(b === true) onBack();
		goBack.current = false
		edited.current = false;
	}

	function back (){
		//console.log("back : edited %s , savePanel : %s",edited.current, data.savePanel)
		if(!edited.current) return onBack();
		setData({...data, savePanel : true})
		goBack.current = true
	}

	function onClose (){
		//console.log("onClose : back %s", goBack.current)
		if(goBack.current) onBack();
		setData({...data, savePanel: false})
		goBack.current = false
	}

	const setMD = (content, f) => { 
		if(!edited.current && !f) return// //console.log("not parsed")
		md.current.innerHTML = marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")); 
	}

	return (
			<div id="editor" mode={data.md ? "md" : "edit"} >
			<div id="editor-top-bar">
				<SimpleButton onClick={back} value="Back" style={{margin: "5px 10px", padding: "0 10px", fontSize : "1rem"}} /> 
				<div id="editor-book-name">{data.book?.name}</div>
				<div style={{margin: "5px 10px 0 auto"}} className="middle">
					<Switch state={data.md ? "on" : "off"} value="md" style={{padding: "5px 10px", margin: "0 5px"}} 
					onClick={()=> { setMD(ref.current.value);  setData({...data, md : !data.md});}} />
					<SimpleButton value="Save" style={{padding: "7px 10px", fontSize : "1rem", background: "green" , color: "#fff"}} onClick={save} />
				</div>
			</div>
			<textarea id="editor-body" ref={ref} placeholder="Start Typing Here" 
				onInput={()=> {setData({...data, text: ref.current.value}); edited.current = true; } }
				value={data.text} ></textarea>
			<div id="editor-md" className="markdown-body" ref={md}>MARKDOWN</div>

			<PopupPanel title="Saved Changes" yes="Save" no="Discard" close={!data.savePanel} 
				onClose={onClose}
				onDone={()=>save(goBack.current)}
			>
				<div className="bb p"> The Book has been Modified ! </div>
			</PopupPanel>
		</div>)
}
