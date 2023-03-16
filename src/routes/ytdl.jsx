import "./css/ytdl.css"

import {useEffect} from "react";

export default function (argument) {

	useEffect(()=>{
		document.title = "YouTube Video Downloader"
		document.querySelector("#logo").textContent = 'YouTube DownLoader'
	},[]);

	return (
		<div id="ytdl-box">
			<form className="ytdl-form">
				<h2 className="form-h2"> Download Audio / Video  </h2>
				<div className="ytdl-url-box">
					<img src="/icons/url.svg" height='30px' width='30px' className="imgD-icon" alt="url"/>
					<input className="ytdl-url" placeholder="Paste YouTube Video URL" />
				</div>
				<button className="submit-ytdl-btn"> Submit </button>
			</form>
		</div>
	)
}