import define from "../../util/define"

export default {
		"settingSwitch0": { 
				float: "right",
				width: "65px",
				height: "30px",
				margin: "9px",
				transition: define.style.transition,
				background: "rgba( 255,255,255, 0 )",
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px"
		},
		"settingSwitch1": { 
				float: "right",
				width: "65px",
				height: "30px",
				margin: "9px",
				transition: define.style.transition,
				background: define.style.drawBgColor1,
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px"
		},
		"switch0":{
				position: "relative",
				top: "-1px",
				width: "30px",
				height: "30px",
				background: "rgba( 255, 255, 255, 0.88 )",
				transition: ( parseInt( define.style.transition ) / 2 ) + "ms",
				transform: "translatex( 33px )",
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px",
				cursor: "pointer"
		},
		"switch1":{
				position: "relative",
				top: "-1px",
				width: "30px",
				height: "30px",
				background: "rgba( 255, 255, 255, 0.88 )",
				transition: ( parseInt( define.style.transition ) / 2 ) + "ms",
				transform: "translatex( 0px )",
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px",
				cursor: "pointer"
		}
}
