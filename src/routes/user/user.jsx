import "./user.css";
import {useState} from "react"

import user from "../../assets/icons/user.svg"
import profile from"../../assets/icons/profile.svg";
import logout from "../../assets/icons/logout.svg"

export default function User (){
	const [data, setData] = useState({open : false});

	return(
		<div id="user" mode={data.open ? "options" : "normal"}>
			<img src={user} onClick ={()=>setData({...data, open : !data.open})} />
			<div id="user-options">
				<div style={{borderRadius: "10px", overflow: "hidden"}}>
					<div className="user-option"><img src={profile} />Profile</div>
					<div className="user-option"><img src={logout} />Logout</div>
				</div>
			</div>
		</div>
	)
}
