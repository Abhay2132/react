import { Link } from "react-router-dom";
import "./login.css";
import { Input1, Button } from "../../ui/form/views";
import { useEffect } from "react";
import "../../ui/frames/mobile.css"

export default function (){
    useEffect(()=>{
        document.querySelector("#logo").textContent = "LOGIN"
        document.title = "LOGIN"
    }, [])
    return (
        <div id="login" className="mobile-box">
            <h3 id="login-title">Enter Login Details </h3>
            <div id="login-form">
                <Input1 label="Email" />
                <Input1 label="Password" />
                <Button text="Login"/> <Link to="/reset" style={style}>Reset Password</Link>
                <div className="p f-s" style={style}>
                    <Link to="/signup">Create new Account</Link>
                </div>
            </div>
        </div>
    )
}

const style = {fontSize : "0.9rem"}