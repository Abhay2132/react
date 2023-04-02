import { Link } from "react-router-dom";
import "./login.css";
import { Input1, Button } from "../../ui/form/views";
import { useEffect } from "react";

export default function (){
    useEffect(()=>{
        document.querySelector("#logo").textContent = "Reset Password"
        document.title = "Reset"
    }, [])
    return (
        <div id="login" className="mobile-box">
            <h3 id="login-title">Enter Your Details </h3>
            <div id="login-form">
                <Input1 label="Email" />
                <Button text="Send Link" style={{background:"royalblue"}} />
            </div>
        </div>
    )
}

const style = {fontSize : "0.9rem"}