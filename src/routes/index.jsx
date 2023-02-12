import "./index.css"
import {Link} from "react-router-dom";

export default function Index (){
	return(<div id="index">
		<Link to={`/imgD`} className="index-link"><div className="index-img"></div><div className="index-name">ImgD</div></Link>
	</div>)
}