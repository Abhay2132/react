import {memo , useState} from "react"
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
export default memo(Book);