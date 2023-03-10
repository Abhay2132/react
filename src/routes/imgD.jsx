import "./css/imgD.css";
import { useRef , useState , useEffect } from "react";
import {wait,delCopy} from "../utilz.js";

export default function ImgD() {

	var [urls, setURLs] = useState(['']);
	var [token, setToken] = useState();
	var [data, setData] = useState({imgs:0, pages:0,cn:"d-no"});

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
		if(!del) return urls[index] = '';
		if(urls.length == 1) return setURLs([''])
		setURLs(URLs => {
			let newArr = new Array();
			for(let i=0; i<URLs.length; i++){
				if(i==index) {
					continue;
				};
				newArr.push(URLs[i])
			}
			return newArr;
		})
	}

	function logData (){
		console.log({urls})
	}

	return (
		<div className="imgD-box" imgd={imgD}>
		<form onSubmit={cancleDefault} className="imgD-form" autoComplete="off">
			<h2 onClick={logData} className="imgD-h2"> Enter URLs </h2>
			<div id="urls-box" ref={urlsBox}>
				{urls.map((url, i) => {
						return (<InputBox remove={remove} key={i} index={i} url={url} inputHandler={inputHandler} />)
					})}
			<label ref={label} className="urls-box-footer">* Paste new url</label>
			</div>
			<button className="add-url" onClick={addURL}>Add More</button>
			<button className="imgD-submit" onClick={onSubmit}>Submit </button>
		</form>
		<Loader/>
		<DataPanel data={data} />
		<Err/>
	</div>
	)
}

function InputBox ({index, inputHandler, remove, url}){
	let [u, setu] = useState("")
	function handleInput (e){
		inputHandler(e.target.value, index);
		setu(e.target.value)
	}

	useEffect(()=>{
		setu(url);
	},[]);

	let input = useRef();
	function removeHandler (){
		remove(index, input.current.value.length < 1)
		setu("")
	};

	return (
		<div className="input-box">
				<img src="/icons/url.svg" height='30px' width='30px' className="imgD-icon" alt="url"/>
				<input ref={input} type="text" name={index} value={u} onInput={handleInput} placeholder="Enter Website URL" />
				<img src="/icons/delete.svg"  height='30px' width='30px' className="imgD-icon" alt="delete" style={{opacity:0.2}} onClick={removeHandler} />
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
			<div className="ir-info"><img src="/icons/img.svg" height="30px"/><span> {data.imgs} Images</span></div>
			<div className="ir-info"><img src="/icons/page.svg" height="30px"/><span> {data.pages} Webpages</span></div>
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