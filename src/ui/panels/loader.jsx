import "./loader.css"

export default function  FullLoader (){
	return(
		<div className="full-loader">
		<div className="popup-panel-bg"></div>
		<div className="full-loading-panel">
			<div className="full-loading-spinner"></div>
			<center animate="blinking"> LOADING </center>
		</div>
		</div>
	)
}