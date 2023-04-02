import "./css/index.css"
import {useEffect, useState } from "react";
import {Link} from "react-router-dom";

export default function Component (){

	useEffect(()=> {
		document.title = "Apps"
		document.querySelector("#logo").textContent = "Apps"
	},[])
	
	const [data , setData] = useState(true)
	
	return(<div id="index" className="app">
		<Link to={`/imgD`} data-href="imgD" className="index-link"><IndexItem name="ImgD" /></Link>
		<Link to={`/ytdl`} data-href="ytdl" className="index-link"><IndexItem name="YTDL" /></Link>
		<Link to={`/notebook`} data-href="notebook" className="index-link"><IndexItem name="NoteBook" /></Link>
	</div>)
}

function IndexItem({name}) {
	return (
		<>
			<div className="index-img"></div>
			<div className="index-name">{name}</div>
			<div className="index-item-desc">{linkDesc[name]}</div>
		</>
	)
}

const linkDesc = {
	"ImgD" : "Download Images from Website",
	"YTDL" :"YouTube Video Downloader",
	"NoteBook" :"Make NoteBook From AnyWhere"
}
