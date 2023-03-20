import './panels.css'
export function ErrorPanel({ children }) {
	return (<div className="error-panel"> 
			<center animate="jiggle">Error Occured </center>
			{children}
		</div>)
}
export function LoadingPanel() {
	return (<div className="loading-panel">
			<div className="loading-spinner"></div>
			<center animate="blinking"> LOADING </center>
		</div>)
}