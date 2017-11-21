import define from "../../util/define"

export default {
		"settingBar": { 
				float: "right",
				width: "128px",
				height: "5px",
				margin: "22px 9px 9px 9px",
				background: define.style.drawBgColor1,
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px"
		},
		"bar":{
				position: "relative",
				top: "-6px",
				left: "-2px",
				width: "15px",
				height: "15px",
				transition: "0ms",
				background: "rgba( 255, 255, 255, 0.88 )",
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px",
				cursor: "pointer"
		},
		stickBarType: "",
		startScreenX: 0,
		startTranslateX: 0,
		translateXs:{
			drawBgColorR: 0,
			drawBgColorG: 90,
			drawBgColorB: 68,
			fontColorR: 55,
			fontColorG: 55,
			fontColorB: 55
		}
}
