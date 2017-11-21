import define from "../../util/define"

export default {
		"setting": { 
				"position": "fixed",
				"letterSpacing": "1px",
				"top": "33px",
				"left": "0",
				"display": "none",
				"verticalAlign": "top",
				"zIndex": "100",
				"textAlign": "left",
				"transition": "0ms",
				"transform": "translate3d( 0%, calc( -100% - 33px ), 1px )",
				"fontSize": "13px",
				"transition": define.style.transition,
				"WebkitOverflowScrolling": "touch",
                                "overflowX": "hidden",
                                "overflowY": "auto",
				"margin": "0% 4% 0% 4%",
				"padding": "0",
				"maxWidth": "inherit",
				"minWidth": "inherit",
				"width": "92%",
				"minHeight": "inherit",
				"maxHeight": "inherit",
				"height": "inherit"
		},
                "inner": {
				"display": "block",
				"padding": "0",
				"margin": "0 auto",
				"width": "100%",
				"height": "100%"
                },
		"space":{
				boxShadow: "1px 0px 0px 0px rgba( 0, 0, 0, 0 ) inset, -1px 0px 0px 0px rgba( 0, 0, 0, 0 ) inset",
				"background": "rgba( 220, 220, 220, 0.92 )",
				"width": "100%",
				"height": "30px"
		},
                "ol": {
				"padding": "0",
				"margin": "0",
				"border": "1px solid " + define.style.lineColor,
				"background": "rgba(255, 255, 255, 0.92 )"
                },
		"li":{
				"display": "block",
				"listStyle": "none",
				"height": "50px",
				"lineHeight": "50px",
//				"paddingLeft": "15px",
				"clear": "both",
				"borderBottom": "1px solid " + define.style.lineColor
		},
		"liConnection":{
				"display": "block",
				"listStyle": "none",
				"lineHeight": "25px",
				"padding": "20px",
				"clear": "both"
		},
		"liMeta":{
				"display": "block",
				"listStyle": "none",
				"lineHeight": "25px",
				"padding": "20px 20px 0px 20px",
				"clear": "both"
		},
		"liDesc":{
				"display": "block",
				"listStyle": "none",
				"lineHeight": "25px",
				"padding": "20px",
				"clear": "both"
		},
		"liLast":{
				"display": "block",
				"listStyle": "none",
				"lineHeight": "50px",
//				"paddingLeft": "15px",
				"clear": "both",
				"height": "50px"
		},
		liLinkCircle:{
				display: "inline-block",
				width: "25%",
				height: "48px"
		},
		socialLink:{
				display: "block",
//				width: "inherit",
				height: "inherit",
				textIndent: "-10000px"
		},
		"icon":{
				width: "60px",
				height: "50px",
				float: "left"
		},
		"subTitle":{
				lineHeight: "50px",
				float: "left"
		},
		"switchMap":{
				float: "right",
				width: "65px",
				height: "30px",
				margin: "9px",
				background: define.style.drawBgColor1,
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px"
		},
		"switch":{
				width: "30px",
				height: "30px",
				background: "rgba( 255, 255, 255, 0.88 )",
				border: "1px solid " + define.style.lineColor,
				borderRadius: "30px"
		},
		uid:{
				fontSize: "8px"
		},
		"iconPlusConnection":{
				float: "right",
				top: "16px", 
				left: "0px", 
				margin: "0px 35px 0px 0px",
				transform: "scale( 1.6 )"
		},
		"mode":{
			"%":{
				"screen1":{
					left: "0px",
					marginRight: "4%",
					marginLeft: "4%",
					width: "92%",
					minWidth: "92%",
					maxWidth: "92%"
				},
				"screen2":{
					left: "300px",
					marginRight: "calc(((100% - 300px) * 0.04 ) )",
					marginLeft: "calc(((100% - 300px) * 0.04 ) )",
					width: "calc(((100% - 300px) * 0.92 ) )",
					minWidth: "calc(((100% - 300px) * 0.92 ) )",
					maxWidth: "calc(((100% - 300px) * 0.92 ) )"
				},
				"screen3":{
					left: "70%",
					marginRight: "calc( 30% * 0.04 )",
					marginLeft: "calc( 30% * 0.04 )",
					width: "calc( 30% * 0.92  )",
					minWidth: "calc( 30% * 0.92  )",
					maxWidth: "calc( 30% * 0.92  )"
				}
			},
			"px":{
				"screen1":{
					left: "0px",
					marginRight: "4%",
					marginLeft: "4%",
					width: "92%",
					minWidth: "92%",
					maxWidth: "92%"
				},
				"screen2":{
					left: "300px",
					marginRight: "calc(((100% - 300px) * 0.04 ) )",
					marginLeft: "calc(((100% - 300px) * 0.04 ) )",
					width: "calc(((100% - 300px) * 0.92 ) )",
					minWidth: "calc(((100% - 300px) * 0.92 ) )",
					maxWidth: "calc(((100% - 300px) * 0.92 ) )"
				},
				"screen3":{
					left: "70%",
					marginRight: "calc( 30% * 0.04 )",
					marginLeft: "calc( 30% * 0.04 )",
					width: "calc( 30% * 0.92  )",
					minWidth: "calc( 30% * 0.92 )",
					maxWidth: "calc( 30% * 0.92  )"
				}
			}
		}
}
