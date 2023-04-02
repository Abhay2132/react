import "./user.css";
import {useState} from "react"
import { Outlet , Link } from "react-router-dom";

import user from "../../assets/icons/user.svg"
import profile from"../../assets/icons/profile.svg";
import logout from "../../assets/icons/logout.svg"
import login from "../../assets/icons/login.svg"

export default function UI(params) {
	let isUser = 0;
	return isUser ? User() : Login();
}

function User (){
	const [data, setData] = useState({open : false});

	return(
		<div id="user" mode={data.open ? "open" : "close"}>
			<div className="user-bg" 
			onClick={()=>setData({...data, open: false})} 
			style={{display: data.open?"block":"none"}}></div>
			<img src={user} onClick ={()=>setData({...data, open : !data.open})} />
			<div id="user-options">
				<div id="user-option">
					<div className="user-option-item"><img src={profile} />Profile</div>
					<div className="user-option-item"><img src={logout} />Logout</div>
				</div>
			</div>
		</div>
	)
}

function Login(){
	return (
		<Link to="/login" className="login-btn middle">
			<img src={login} style={{heigth: "30px", aspectRatio:'1/1' }}/>
		</Link>
	)
}