// import "./css/index.css"

import {useEffect} from "react";
import {Link} from "react-router-dom";
import {IndexItem} from "../ui/ui.jsx"

export default function Index (){

	useEffect(()=> {
		document.title = "Appz"
	},[])

	return(<div id="index">
		<Link to={`/imgD`} className="index-link"><IndexItem name="ImgD" /></Link>
		<Link to={`/ytdl`} className="index-link"><IndexItem name="YTDL" /></Link>
	</div>)
}