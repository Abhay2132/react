import { Link } from "react-router-dom";
import "./login.css";
import { Input1, Button } from "../../ui/form/views";
import { useEffect } from "react";

export default function (){
    useEffect(()=>{
        document.querySelector("#logo").textContent = "SignUp"
        document.title = "SignUp"
    }, [])
    return (
        <div id="signup" className="mobile-box" >
            <h3 id="login-title">Enter SignUp Details </h3>
            <div id="login-form">
                <Input1 label="Email" />
                <Input1 label="Password" type="password" />
                <Input1 label="Confirm Password" type="password" />
                <Button text="SignUp" style={{background:"royalblue"}} /> 
                <div className="p f-s" style={style}>
                    <Link to="/login">Already had Account</Link>
                </div>
            </div>
        </div>
    )
}

const style = {fontSize : "0.9rem"}