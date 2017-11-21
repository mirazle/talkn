import define from "../../util/define"

export default {
		"thread": { 
				"position": "relative",
				"top": "0",
				"left": "0",
				"position": "relative",
				"display": "inline-block",
				"zIndex": "1",
				"verticalAlign": "top",
				"WebkitOverflowScrolling": "touch",
				"overflowY": "auto",
				"fontSize": "12px",
				"background": define.style.bgColor,
				"transition": "0ms",
				"transform": "translate3d( 0%, 0px, 10px )",
				"minWidth": "33.4%",
				"maxWidth": "33.4%",
				"width": "33.4%",
				"minHeight": "inherit",
				"maxHeight": "inherit",
				margin: "0",
				padding: "0",
				"height": "inherit"
		},
                "inner": {
                                "width": "100%",
                                "height": "100%",
                                "overflowY": "auto"
                },
		"mode":{
			"%":{
				"screen1":{
					"minWidth": "33.4%",
					"maxWidth": "33.4%",
					"width": "33.4%"
				},
				"screen2":{
					"width": "calc( ( 100% - 300px ) / 2 )",
					"minWidth": "calc( ( 100% - 300px ) / 2 )",
					"maxWidth": "calc( ( 100% - 300px ) / 2 )"
				},
				"screen3":{
					"minWidth": "calc( ( 100% - 300px ) - 30% )",
					"maxWidth": "calc( ( 100% - 300px ) - 30% )",
					"width": "calc( ( 100% - 300px ) - 30% )"
				}
			},
			"px":{
				"screen1":{
					"minWidth": "33.4%",
					"maxWidth": "33.4%",
					"width": "33.4%"
				},
				"screen2":{
					"width": "calc( ( 100% - 300px ) / 2 )",
					"minWidth": "calc( ( 100% - 300px ) / 2 )",
					"maxWidth": "calc( ( 100% - 300px ) / 2 )"
				},
				"screen3":{
					"minWidth": "calc( ( 100% - 300px ) - 30% )",
					"maxWidth": "calc( ( 100% - 300px ) - 30% )",
					"width": "calc( ( 100% - 300px ) - 30% )"
				}
			}
		},
		"ol": { 
				"listStyle": "none",
				"margin": "0",
				"paddingLeft": "1%",
				"paddingRight": "4%"
		},
		post: {
				"width": "100%",
				"height": "70px",
				"clear": "both"
		},
		left: {
				"float": "left",
				"width": "18%"
		},
		right: {
				"float": "right",
				"width": "82%"
		},
		postTime: {
				"display": "block",
				"textAlign": "right"
		},
		balloon: {
				"display": "block",
				"background": define.style.drawBgColor,
				"padding": "10px",
				"borderRadius": "10px"
		},
		getMore:{
				display: "none",
				"transition": define.style.transition,
				fontWeight: "bold",
				"color": "rgba( 255,255,255, 1)",
				"width": "60%",
				"margin": "10px 17% 0px 23%",
				"padding": "4px 0px 4px 0px",	
				"borderRadius": "20px",
				cursor: "pointer",
				"textAlign": "center"
				
		},
		threadHidden:{
				display: "none"
		},
		newPostAlert: {
				"position": "fixed",
				"bottom": "0px",
				"transition": define.style.transition,
				"transform": "translate3d( 0px, 30px, 1px )",
				"width": "60%",
				fontWeight: "bold",
				"color": "rgba( 255,255,255, 1)",
				"margin": "0px 20% 0px 20%",
				"padding": "4px 0px 4px 0px",	
				"borderRadius": "20px",
				"textAlign": "center",
				"background": define.style.highlightBgColor,
				"transition": "500ms"
		},
		scrollData: {},
		newPostAlertFlg: false,
		startMoveLeft: "0px"
}
