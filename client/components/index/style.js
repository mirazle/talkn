import define from "../../util/define"

export default {
		"index": { 
			"position": "relative",
			"top": "0",
			"left": "0",
			"display": "inline-block",
			"verticalAlign": "top",
			"zIndex": "10",
			"transition": "0ms",
			"transform": "translate3d( 0%, 0px, 1px )",
			"fontSize": "12px",
			"WebkitOverflowScrolling": "touch",
			"background": define.style.bgColor,
			"boxShadow": "-1px 1px 0px 0px " + define.style.lineColor + " inset",
			"overflowX": "hidden",
			"minWidth": "calc( 33.3% )",
			"maxWidth": "calc( 33.3% )",
			"width": "calc( 33.3% )",
			"minHeight": "inherit",
			"maxHeight": "inherit",
			"height": "inherit",
			padding: "0",
			margin: "0"
		},
		guideWrap: {
			boxSizing: "initial",
			width: "calc( 100% - 20px )",
			height: "35px",
			padding: "10px",
			background: define.style.drawBgColor1,
			borderBottom: "1px solid " + define.style.lineColor,
			clear: "both"
		},
		guideLeft: {
			textAlign: "left",
			width: "35%",
			display: "inline-block",
			float: "left"
		},
		guideRight: {
			width: "65%",
			display: "inline-block",
			float: "right"
		},
		textarea: {
			"maxWidth": "95%",
			"minWidth": "95%",
			"width": "95%",
			"height": "20px",
			"padding": "8px 0px 0px 0px",
			"overflow": "hidden",
			"wordWrap": "breakWord",
			"resize": "none",
			"borderRadius": "4px",
			"border": "1px solid #ddd",
			margin: "0",
			"fontSize": "14px",
			"lineHeight": "14px",
			"letterSpacing": "3px",
			"background": "rgba( 255, 255, 255, 0.9 )",
			"outline": "none",
			"transition": define.style.transition,
			"boxSizing": "initial",
			"fontWeight": "normal"
		},
		"mode":{
			"%":{
				"screen1":{
					"minWidth": "33.3%",
					"maxWidth": "33.3%",
					"width": "33.3%"
				},
				"screen2":{
					"minWidth": "300px",
					"maxWidth": "300px",
					"width": "300px"
				},
				"screen3":{
					"minWidth": "300px",
					"maxWidth": "300px",
					"width": "300px"
				}
			},
			"px":{
				"screen1":{
					"minWidth": "calc( 33.3% )",
					"maxWidth": "calc( 33.3% )",
					"width": "calc( 33.3% )"
				},
				"screen2":{
					"minWidth": "300px",
					"maxWidth": "300px",
					"width": "300px"
				},
				"screen3":{
					"minWidth": "300px",
					"maxWidth": "300px",
					"width": "300px"
				}
			}
		},
		"ol": { 
				"listStyle": "none",
				"margin": "0",
				"padding": "0"
		},
		togglePreDeleteFlg: false,
		changeThreadConnection: "",
		startMoveTop: "0px",
		startMoveLeft: "0px"
}
