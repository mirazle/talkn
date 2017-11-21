import define from "../../util/define"

export default {
		"detail": { 
				"position": "relative",
                                "top": "0",
				"left": "0",
				"display": "inline-block",
				"verticalAlign": "top",
				"zIndex": "100",
				"textAlign": "left",
				"transition": "0ms",
				"transform": "translate3d( 0%, 0px, 1px )",
				"background": define.style.drawBgColor2,
				"boxShadow": "1px 1px 0px 0px " + define.style.lineColor + " inset",
				"fontSize": "13px",
				"WebkitOverflowScrolling": "touch",
                                "overflowX": "hidden",
                                "overflowY": "auto",
				"margin": "0px",
				"padding": "0px",
				"minWidth": "33%",
				"maxWidth": "33%",
				"width": "33%",
				"minHeight": "inherit",
				"maxHeight": "inherit",
				"height": "inherit"
		},
                "inner": {
				"width": "100%",
				"height": "100%"
                },
		"space":{
				"width": "100%",
				"height": "30px"
		},

		apiWrapOl:{
				position: "absolute",
				"margin": "0",
				"padding": "0",
				"height": "45px",
				"width": "100%"
		},
		apiWrapBack:{
				position: "fixed",
    				left: "0px",
				zIndex: "10",
    				width: "12.50%",
				height: "44px",
				transition: define.style.transition,
				borderBottom: "1px solid rgb(200, 200, 200)"
		},
		apiWrapNext:{
				position: "fixed",
    				right: "0px",
				zIndex: "10",
    				width: "12.50%",
				height: "44px",
				transition: define.style.transition,
				borderBottom: "1px solid rgb(200, 200, 200)"
		},
		apiWrapAbox:{
				display: "block",
    				background: "rgba( 250, 250, 250, 0.9 )",
				width: "92%",
				height: "44px",
				opacity: "0.4",
				transition: define.style.transition,
				height: "inherit"
		},
		apiWrapAboxOn:{
				cursor: "pointer",
				opacity: "1"
		},
		apiOl:{
				position: "absolute",
				zIndex: "1",
				whiteSpace: "nowrap",
				left: "12.50%",
				margin: "0",
				padding: "0",
				fontSize: "0",
				width: "100%",
				height: "45px",
				transform: "translateX( 0px )",
				transition: define.style.transition
		},
		apiLi:{
				display: "inline-block",
    				width: "25%",
				listStyle: "none",
				padding: "0",
				margin: "0",
				height: "44px",
				transition: define.style.transition,
				borderBottom: "1px solid rgb(200, 200, 200)"
		},
		apiLiFocus:{
				display: "inline-block",
    				width: "25%",
				listStyle: "none",
				padding: "0",
				margin: "0",
				height: "44px"
		},
		apiAbox:{
				display: "block",
				borderRadius: "5px 5px 0px 0px",
    				background: define.style.bgColor,
				width: "92%",
				listStyle: "none",
				padding: "0",
				margin: "0 auto",
				height: "calc( 100% - 1px )",
				cursor: "pointer",
				transition: define.style.transition,
				opacity: "0.4",
				borderTop: "1px solid rgba(255, 255, 255, 0)",
				borderLeft: "1px solid rgba(255, 255, 255, 0)",
				borderRight: "1px solid rgba(255, 255, 255, 0)"
		},
		apiAboxFocus: {
				opacity: "1",
				boxShadow: "rgba(255, 255, 255, 0.9 ) 0px 1px 0px 0px"
		},
		apiAboxFocusOut: {
				boxShadow: "rgba(255, 255, 255, 0.9 ) 0px 1px 0px 0px"
		},
		apiA:{
				display: "block",
				height: "inherit",
				textIndent: "-10000px"
		},
                "olConnection": {
				"margin": "0",
				"padding": "0",
				"width": "100%",
				"borderTop": "1px solid " + define.style.lineColor,
				"borderBottom": "1px solid " + define.style.lineColor,
				"background": define.style.bgColor
                },
		apiCase: {
				boxSizing: "content-box",
				"margin": "45px 0px 0px 0px",
				"padding": "20px",
			//	"width": "100%",
				"width": "calc( 100% - 40px )",
				"borderBottom": "1px solid " + define.style.lineColor,
				"background": define.style.bgColor
                },
		"li":{
				"display": "block",
				"listStyle": "none",
				"height": "50px",
				"lineHeight": "50px",
				"paddingLeft": "50px",
				"clear": "both",
				"borderBottom": "1px solid " + define.style.lineColor
		},
		"liConnectionTable":{
				"display": "table",
				"listStyle": "none",
				"lineHeight": "25px",
				"width": "100%",
				"height": "25px",
				"padding": "20px 20px 20px 25px"
		},
		"liConnectionTd":{
				display: "table-cell"
		},
		"iconPlusConnection":{
				top: "4px", 
				left: "0px", 
				margin: "0px 20px 0px 0px",
				transform: "scale( 1.4 )"
		},
		"connection":{
				cursor: "pointer",
				wordWrap: "break-word",
				width: "calc( 100% - 50px )"
		},
		meta:{
			root:{
					"listStyle": "none",
					"lineHeight": "25px",
					"clear": "both"
			},
			head:{
				display: "flex",
				margin:"0",
				padding:"0",
				width: "100%"

			},
			headTitle:{
				fontWeight: "bold",
				width: "calc( 100% - 32px )",
				paddingRight: "10px",
				display: "inline-block"
			},
			headIcon:{
				width: "32px",
				display: "inline-block"
			},
                	"olKeyword": {
					"margin": "0",
					"padding": "0",
					"width": "100%",
					"background": define.style.bgColor
                	},
			"keyword":{
					display: "table",
//					lineHeight: "30px",
					margin: "0px 0px 5px 0px",
					padding: "1px 15px 0px 15px",
					borderRadius: "50px",
					background: "rgba(0, 153, 153, 0.7)",
					cursor: "pointer",
					color: "#eee"
			},
			desc:{
					padding: "20px 0px 20px 0px",
					"display": "block",
					"listStyle": "none",
					"lineHeight": "25px",
					"clear": "both"
			},
                	"olLink": {
					width: "calc( 100% + 40px )",
					position: "relative",
					left: "-20px",
					"margin": "0",
					"padding": "0"
                	},
			liLink:{
					display: "inline-block",
					width: "25%",
					listStyle: "none",
					padding: "0",
					margin: "0",
					height: "48px"
			},
			inputLabel:{
					textIndent: "10px",
					fontWeight: "bold"
			},
			inputThreadTitleWrap: {
					marginTop: "15px"
			},
			inputThreadTitle: {
					padding: "5px 5px 5px 10px",
					overflow: "hidden",
					resize: "none",
					borderRadius: "4px",
					border: "1px solid rgba(98, 98, 98, 0.34902)",
					fontSize: "15px",
					lineHeight: "15px",
					width: "70%",
					height: "20px",
					letterSpacing: "3px",
					background: "rgba(255, 255, 255, 0)",
					boxSizing: "content-box",
					outline: "none",
					marginBottom: "20px",
					fontWeight: "normal"
			},
			inputThreadDescWrap: {
			},
			inputThreadDesc: {
					padding: "10px",
					overflow: "hidden",
					resize: "none",
					borderRadius: "4px",
					border: "1px solid rgba(98, 98, 98, 0.34902)",
					fontSize: "15px",
					lineHeight: "15px",
					width: "70%",
					height: "50px",
					letterSpacing: "3px",
					background: "rgba(255, 255, 255, 0)",
					boxSizing: "content-box",
					outline: "none",
					marginBottom: "20px",
					fontWeight: "normal"
			},
			metaIcon:{
					display: "inline-block",
					width: "32px",
					height: "32px",
					textIndent: "-10000px"
			},
			writeIcon:{
					position: "relative",
					top: "3px",
					marginRight: "7px",
					display: "inline-block",
					width: "18px",
					height: "18px",
					textIndent: "-10000px"
			},
			submit:{
				margin: "10px 0px 0px 15px",
				fontWeight: "bold",
				background: "none",
				border: "1px solid rgba( 220, 220, 220, 0.7)",
				color: "rgba( 220, 220, 220, 0.7)",
				borderRadius: "5px",
				padding: "10px 15%"
			}
		},
		social:{
			ol:{
				margin: "0",
				padding: "0",
				listStyle: "none"
			},
			li:{
				borderBottom: "1px solid rgba( 200, 200, 200, 0.8 )",
				margin: "0px 0px 20px 0px"
			},
			left:{
				background: "url() 50% 50% / 48px 48px no-repeat",
				display: "inline-block",
				verticalAlign: "top",
				height: "48px",
				listStyle: "none",
				padding: "0",
				margin: "0",
				width: "25%"
			},
			right:{
				display: "inline-block",
				paddingBottom: "20px",
				width: "75%"
			},
			userName:{
				marginBottom: "8px",
				fontWeight: "bold"
			},
			text:{

			}
		},
		movie:{
			ol:{
				margin: "0",
				padding: "0",
				listStyle: "none"
			},
			li:{
				borderBottom: "1px solid rgba( 200, 200, 200, 0.8 )",
				margin: "0px 0px 20px 0px"
			},
			left:{
				cursor: "pointer",
				background: "url() 50% 50% / 120px 90px no-repeat",
				display: "inline-block",
				verticalAlign: "top",
				height: "90px",
				width: "130px"
			},
			right:{
				display: "inline-block",
				padding: "0px 0px 20px 10px",
				width: "calc( 100% - 140px )"
			},
			chTitle:{
				marginBottom: "8px",
				fontWeight: "bold"
			},
			title:{
				marginBottom: "8px"
			},
			text:{

			}
		},
		socialLink:{
				display: "block",
				height: "inherit",
				textIndent: "-10000px"
		},
		"subTitle":{
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
		"mode":{
			"%":{
				"screen1":{
					"width": "33.3%",
					"minWidth": "33.3%",
					"maxWidth": "33.3%"
				},
				"screen2":{
					"width": "calc( ( 100% - 300px ) / 2 )",
					"minWidth": "calc( ( 100% - 300px ) / 2 )",
					"maxWidth": "calc( ( 100% - 300px ) / 2 )"
				},
				"screen3":{
					"width": "30%",
					"minWidth": "30%",
					"maxWidth": "30%"
				}
			},
			"px":{
				"screen1":{
					"width": "33.3%",
					"minWidth": "33.3%",
					"maxWidth": "33.3%"
				},
				"screen2":{
					"width": "calc( ( 100% - 300px ) / 2 )",
					"minWidth": "calc( ( 100% - 300px ) / 2 )",
					"maxWidth": "calc( ( 100% - 300px ) / 2 )"
				},
				"screen3":{
					"width": "30%",
					"minWidth": "30%",
					"maxWidth": "30%"
				}
			}
		},
		"detailMenu": { 
				"listStyle": "none",
				"textAlign": "center",
				"lineHeight": "25px",
				"margin": "0",
				"padding": "10px",
				"paddingTop": "15px"
		},
		"detailMenuFirst":{
				"width": "30%",
				"border": "1px solid " + define.style.fontColor,
				"borderRadius": "5px 0px 0px 5px",
				"borderRight": "none",
				"background": define.style.highlightBgColor,
				"color": define.style.highlightFontColor,
				"display": "inline-block"
		},
		"detailMenuMiddle":{
				"width": "30%",
				"border": "1px solid " + define.style.fontColor,
				"borderRadius": "0px 0px 0px 0px",
				"display": "inline-block"
		},
		"detailMenuLast":{
				"width": "30%",
				"border": "1px solid " + define.style.fontColor,
				"borderRadius": "0px 5px 5px 0px",
				"borderLeft": "none",
				"display": "inline-block"
		},
		"detailMenuContents":{
				"padding": "0",
				"margin": "0 auto",
				"width": "100%",
				"height": "calc( 100% - 70px )",
				"WebkitOverflowScrolling": "touch",
				"overflow": "scroll"
		},
		"detailMenuContentOl":{
				"listStyle": "none"
		},
		connectionPointer: 0,
		apiMenuExeKey: "meta",
		apiMenuPointer: 0,
		apiMenuBackOn: false,
		apiMenuNextOn: true
}
