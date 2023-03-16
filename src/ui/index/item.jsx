import "./index.css"

export default function ({name}){
	return (
		<>
			<div className="index-img"></div>
			<div className="index-name">{name}</div>
			<div className="index-item-desc">{linkDesc[name]}</div>
		</>
	)
}

const linkDesc = {
	"ImgD" : "Download Images from Website",
	"YTDL" :"YouTube Video Downloader"
}