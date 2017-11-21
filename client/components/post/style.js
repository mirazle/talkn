import define from "../../util/define"

export default {
		post: {
				"padding": "5px 0px 5px 0px",
				"width": "100%",
				"height": "70px",
				"clear": "both"
		},
		left: {
				"background": define.style.userThumM,
				"opacity": define.style.userThumOpacity,
				"display": "block",
				"margin": "0 auto",
				"float": "left",
				"height": "100%",
				"width": "20%"
		},
		right: {
				"display": "block",
				"float": "right",
				"width": "80%"
		},
		postTime: {
				fontSize: "11px",
				"display": "block",
				"textAlign": "right"
		},
		balloon: {
				"display": "block",
				"textAlign": "left",
				"background": define.style.drawBgColor1,
				"padding": "10px 10px 10px 15px",
				"borderRadius": "10px",
				"overflow": "hidden",
				color: define.style.drawFontColor1,
//				"whiteSpace": "nowrap",
				"textOverflow": "ellipsis",
				cursor: "pointer",
				"wordWrap": "break-word"

		},
		balloonConnection:{
				paddingBottom: "5px",
				textOverflow: "ellipsis",
				overflow: "hidden",
				whiteSpace: "nowrap",
				color: define.style.drawFontColor1
		},
		balloonTalk:{
				color: define.style.drawFontColor1
		},
		startMoveLeft: "0px"
}
