import { PopupPanel } from "../../ui/panels/main"
import {getBooks, getBook, updateBook, deleteBook} from "./api"
import { Editable, Switch, SimpleButton, Button, Input } from "../../ui/form/views"
import {useState, useEffect} from "react"
import Book from "./book";

export default function SettingPanel({ id, close, onClose, onDone }) {
	let book = getBook(id, 1) || { name: "", desc: "" };
	const [data, setData] = useState({ ...book, close, onDone , id, deletePanel : false});

	useEffect(() => {
		let book = getBook(id, 1) || { name: "", desc: "" };
		setData({ ...data, close: close, name: book.name || "", desc: book.desc || "", onDone })
	}, [close])

	return (
	<PopupPanel id="nb-setting" close={data.close}  onClose={onClose} 
		title= {"Settings | " + book?.name}
		onDone={()=>{ updateBook(id, {name: data.name||"", desc: data.desc||""}); onDone(); } } 
	>
		<div className="middle" style={{padding: "10px", transform: "scale(0.9)"}}>
			<Book name={data.name} desc={data.desc} viewOnly={true} />
		</div>
		<div className="nb-setting-body">
			<h4>Basic Settings</h4>
			<Editable value={data.name} label="Name" disabled={true} onEdit={(value)=> setData({...data, name : value||""}) } />
			<Editable value={data.desc} label="Description" disabled={true}  onEdit={(value)=> setData({...data,desc : value||""}) }/>
			<h4 className="m">Danger Zone</h4>
			<div className="p"> Delete this NoteBook  </div>
			<div className="p-H m-B">
				<Button text="Delete" style={{background : "red", color: "#fff"}}
				onClick={()=>setData({...data, deletePanel: true})} />
			</div>
		</div>

		<PopupPanel title="Confirm Your Action"
			yes="Yes" no="No"
			close={!data.deletePanel}
			onClose={()=>setData({...data,deletePanel:false})}
			onDone={()=>{
				deleteBook(id);
				setData({...data, deletePanel: false});
				onDone();
			}}
		>
			<div className="p">Delete the NoteBook <b>{data.name}</b></div>
		</PopupPanel>
	</PopupPanel>)
}