import "./css/ytdl.css"
import "../ui/form/dataState.css"

import {Button, Input, Option} from "../ui/form/views.jsx"
import {ErrorPanel, LoadingPanel} from "../ui/form/panels.jsx";

import {useEffect,useState, useRef} from "react";
const defaultData = {audio: "", video:"", type: "video", iframeSRC: ""};

export default function Component (argument) {
	const host = location.origin || "http://localhost:3000"
	const [videos, setVideos] = useState(["144p", "240p", "360p", "480p", "720p","1080p"]);
	const [audios, setAudios] = useState(['48 kbps',"64 kbps","128 kbps","160 kbps"]);
	const [formState, setFormState] = useState("empty")
	const [url, setURL] = useState("")
	const [data, setData] = useState(defaultData);
	const [response, setResponse] = useState({
		thumbnail : "", 
		iframeUrl: "", title : "Video Name".repeat(10), dur : 10,
		aqs: {}, vqs: {}
	});
	const [size, setSize] = useState("Select a Quality First");

	useEffect(()=>{
		document.title = "YouTube Video Downloader"
		document.querySelector("#logo").textContent = 'YouTube DownLoader'
	},[]);

	const input = useRef()

	function onSubmit(e){
		e.preventDefault();
		let url = input.current.value 
		setURL(input.current.value);
		if(!Boolean(url.length)) return 
		setData(defaultData)
		setFormState("loading")

		fetch(host+"/ytdl",{
			method: "POST",
			body: JSON.stringify({url}),
			headers : {
				"Content-Type" :"application/json"
			}
		})
		.then(res => res.json())
		.then(handleData)
		.catch(handleError);
	}

	function handleData(data){
		setResponse(data);

		setFormState("data");
		setVideos(Object.keys(data.vqs));
		setAudios(Object.keys(data.aqs));
		console.log(data);
	}

	function handleError(error) {
		setFormState("error")
		console.error({error})
	}

	function startDL (){
		console.log(url)
		if(!Boolean(url.length)) return alert("URL IS EMPTY")
		window.open(`${host}/ytdl/dl?url=${url}&q=${data.type=="video"? response.vqs[data.video].height:data.audio}&a=${data.type=="audio"?"1":""}`)
	}

	const parseSize = s => s ? ("~ "+(parseInt(s)/(1024*1024)).toFixed(1)+" MB") : "Select a Quality First";

	useEffect(()=>{
		if(!response) return;
		if(data.type == "video"){
			if(Boolean(data.video) && response.vqs.hasOwnProperty(data.video))
				setSize(parseSize(response.vqs[data.video].size || 0));
		} else if(data.type =="audio") {
			if(Boolean(data.audio) && response.aqs.hasOwnProperty(data.audio))
				setSize( parseSize(response.aqs[data.audio]));
		}
	},[data])

	function loadIframe (){
		console.log(data, response.iframeUrl)
		setData({...data, iframeSRC: response.iframeUrl})
	}

	return (
		<div id="ytdl-box" className="app" data-state={formState}>
			<form className="ytdl-form" onSubmit={onSubmit} autoComplete="off">
				<h2 className="form-h2"> YouTube DL </h2>
				<Input refhook={input} placeholder="Paste Video Link" style={{margin: "20px 0 5px 0"}}/>
				<Button bg={"rgba(0,0,0,0.4)"}>Submit</Button>
			</form>
			<ErrorPanel><center>Try Resubmit the Link</center></ErrorPanel>
			<LoadingPanel/>
			<div className="data-panel" id="ytdl-data">
				<h3 className="panel-title">Video Details</h3>
				<div id="videoThumbnail" style={{background: Boolean(response.thumbnail) ? `url("${response.thumbnail}")` : "#000"}}></div>
				<div id="ytdl-data-grid">
					<div className="ytdl-data-col1">Name</div><div className="ytdl-data-col2 center-V">{response.title}</div>
					<div className="ytdl-data-col1">Duration</div><div className="ytdl-data-col2 center-V">{parseTime(response.dur)}</div>
					<div className="ytdl-data-col1">TYPE</div><div className="ytdl-data-col2">
						<Option state={data.type=="video" ? "active":""} onClick={()=>setData({...data, type: "video"})}>VIDEO</Option>
						<Option state={data.type=="audio" ? "active":""} onClick={() => setData({...data, type:"audio"})}>AUDIO</Option>
					</div>
					<div className="ytdl-data-col1">Quality</div>
					<div className="ytdl-data-col2" data-type={data.type}>
						<div className="video-qualities">
							{videos.map((vq,i)=> <Option state={data.video == vq? "active" : ""} onClick={()=>setData({...data, video:vq})} key={i} text={vq} />)}
						</div>
						<div className="audio-qualities">
							{audios.map((aq,i)=> <Option state={data.audio == aq ? "active" : ""} key={i} text={aq} onClick={()=>setData({...data, audio:aq})} />)}
						</div>
					</div>
					<div className="ytdl-data-col1">Size</div>
					<div className="ytdl-data-col2 center-V">{size}</div>
				</div>
				
			<center><Button onClick={startDL} cursor="pointer" bg="var(--ytdl-bg)" padding="10px 20px" size="1.1rem">DOWNLOAD</Button></center>
			</div>
		</div>
	)
}

const parseTime = sec => {
	if(sec < 60) return sec+" Seconds";
	if(sec < 60*60){
		let min = parseInt(sec / 60);
		let secs = sec - min * 60;
		return `${min} Minutes ${secs > 0 ? secs+"seconds" : ""}`;
	}
	if(sec < 60*60*60){
		let hrs = parseInt(sec/3600);
		let min = parseInt((sec-hrs*3600)/ 60); // remaining seconds / seconds in minute
		return `${hrs} Hours ${min > 0 ? min+" Minutes": ""}`;
	}
}