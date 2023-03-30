import { PopupPanel } from "../../ui/panels/main"
import {getBooks, getBook, updateBook, deleteBook} from "./api"
import Book from "./book";
import {useRef, useState} from "react"
import { Editable, Switch, SimpleButton, Button, Input } from "../../ui/form/views"

export default function(props) {
	const [name, setName] = useState("")
	const [desc, setDesc] = useState("")

	return (
		<PopupPanel id="new-nb-panel" title="Create New Book" {...props} 
		onDone ={()=> props.onDone({name, desc})} >
			<div className="middle" style={{padding: "10px", transform: "scale(0.9)"}}>
				<Book name={name} desc={desc} viewOnly={true} />
			</div>
			<form id="new-book-form" className="p">
			<div className="p bdr-b m">Enter Details</div>
				<Input value={name} imp="1" label="Name" placeholder="NoteBook Name" inputHandler={(d)=>setName(d)} mode="light" />
				<Input value={desc} label="Description" placeholder="About the Book"  inputHandler={(d)=>setDesc(d)} mode="light" />
			</form>
		</PopupPanel>)
}