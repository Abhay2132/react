import "./css/imgD.css";
import { useRef , useState , useEffect } from "react";
import {wait,delCopy} from "../utilz.js";
import {Button, Input} from "../ui/form/views.jsx"

import imgIcon from "../assets/icons/img.svg";
import pageIcon from "../assets/icons/page.svg";

export default function () {

	var [urls, setURLs] = useState(['']);
	var [token, setToken] = useState();
	var [data, setData] = useState({imgs:0, pages:0,cn:"d-no"});
	// console.log(setURLs(['']))
	var [imgD, setImgD] = useState("empty")

	const label = useRef();
	const urlsBox = useRef();

	useEffect(() => {
		document.title = "Image Downloader"
		document.querySelector("#logo").textContent = 'Image Downloader'
	}, [])

	function cancleDefault (e) {
		e.preventDefault();
	}

	async function onSubmit (){
		if(urls.length < 2 && urls[0].length < 1) return animateLabel()
		// setTimeout(() => setURLs(oldURLs => oldURLs.filter(Boolean)), 100);
		//label.current.style.visibility = "hidden"
		let newUrls = delCopy(urls).filter(Boolean);
		setURLs(newUrls)
		postData(newUrls);
		// console.log("onSubmit", urls)

	}

	function addURL (){
		urlsBox.current.scrollTo(0, urlsBox.current.scrollHeight)
		if(urls.at(-1).length < 6) {
			animateLabel();
			return
		}
		setURLs(oldURLs => ([
			...oldURLs, ''
		]));
		label.current.style.visibility = "visible";
		setTimeout(() => urlsBox.current.scrollTo(0, urlsBox.current.scrollHeight), 10);
	}

	function postData (data){
		if(!data || !Array.isArray(data) || data.length < 1) return new Error("invalid 'urls' data !")

		setImgD("loading");
		fetch("/imgD", {
			method: "POST",
			body : JSON.stringify({urls : data}),
			headers : {
				"Content-Type" : "application/json"
			}
		})
		.then(res => res.json())
		.then(showInfo)
		.catch((err)=>{
			setImgD("err")
		})
	}

	function showInfo (d){
		if(d.error) return console.error(d);
		let {imgs, token , pages} = d;
		setImgD("data")
		setData({imgs, token, pages, cn:""})
	}

	function inputHandler (val, index)	{
		urls[index] = val;
		// label.current.style.visibility = urls.at(-1).trim().length > 7 ? "hidden" : "visible";
	}

	function animateLabel (){
		label.current.setAttribute("animate", "jiggle");
		setTimeout(()=> label.current.setAttribute("animate", ""), 500)
	}

	function remove (index, del){
		// console.log("remove : " , urls);
		if(!del) return urls[index] = '';
		if(urls.length == 1) return setURLs([''])
		setURLs([...urls.slice(0,index), ...urls.slice(index+1)]);
	}

	function logData (){
		console.log({urls})
	}

	return (
		<div className="app imgD-box" imgd={imgD}>
		<form onSubmit={cancleDefault} className="imgD-form" autoComplete="off">
			<h2 onClick={logData} className="imgD-h2"> Enter URLs </h2>
			<div id="urls-box" ref={urlsBox}>
				{urls.map((url, i) => {
						// console.log(urls);
						return (<Input placeholder="Paste Website Link" mode="light" remove={remove} key={i} index={i} url={url} inputHandler={inputHandler} />)
					})}
			<label ref={label} className="urls-box-footer">* Paste new url</label>
			</div>
			<Button bg="rgba(0,0,0,0.8)" onClick={addURL}>Add More</Button>
			<Button bg="Green" onClick={onSubmit}>Submit </Button>
		</form>
		<Loader/>
		<DataPanel data={data} />
		<Err/>
	</div>
	)
}

function DataPanel ({data}){
	function startDL(token){
		window.open("/imgD/dl?token="+token);
	}

	return (
		<div id="result-panel">
			<div id='ir-head'>Result</div>
			<div className="ir-info"><img src={imgIcon} height="30px"/><span> {data.imgs} Images</span></div>
			<div className="ir-info"><img src={pageIcon} height="30px"/><span> {data.pages} Webpages</span></div>
			<center><button onClick={()=> startDL(data.token)} >Download Zip</button></center>
		</div>
	)
}

function Loader (){
	return (
		<div className="loader-box">
			<div className="loader-spinner"></div>
			<center animate="blinking"> LOADING </center>
		</div>
	)
}

function Err ({err}){
	return (
		<div className="err"> 
			<center animate="jiggle">Error Occured </center>
			<center animate="jiggle1">Try Submiting Again ! </center>
		</div>
		)
}