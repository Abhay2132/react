import {useEffect} from "react";
import "./css/index.css"
import {Link} from "react-router-dom";

export default function Index (){

	useEffect(()=> {
		document.title = "Appz"
	},[])

	return(<div id="index">
		<Link to={`/imgD`} className="index-link"><div className="index-img"></div><div className="index-name">ImgD</div></Link>
	</div>)
}