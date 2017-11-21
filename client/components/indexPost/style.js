import define from "../../util/define"

export default {
		indexPost: {
				"boxSizing": "border-box",
				"paddingBottom": "10px",
				"width": "100%",
				"height": "80px",
				"borderBottom": "1px solid " + define.style.lineColor,
				margin: "0",
				padding: "0",
				"clear": "both"
		},
		remove:{
				float: "left",
				background: "rgba( 0,0,0,0.1)",
				width: "65px",
				height: "100%",
				position: "relative",
				top: "0px",
				left: "0px",
				textAlign: "left",
				opacity: "1",
				boxShadow: "-1px 0px 0px 0px rgba( 0, 0, 0, 0.1 ) inset",
				transition: define.style.transition,
				margin: "0",
				padding: "0",
				transform: "translateX( 0px )"
		},
		indexWrap:{
				float: "right",
				width: "calc( ( 100% - 65px ) * 0.96 )",
				padding: "0px calc( ( 100% - 65px ) * 0.04 ) 0px 0%",
				height: "100%",
				transition: define.style.transition,
				margin: "0",
				transform: "translate3d( 0px, 0px, 1px )"
		},
		left: {
				"background": define.style.userThumM,
				"display": "block",
				"margin": "0 auto",
				"float": "left",
				"height": "100%",
				"width": "25%"
		},
		right: {
				textOverflow: "ellipsis",
				overflow: "hidden",
				whiteSpace: "nowrap",
				"textAlign": "left",
				"display": "block",
				"paddingTop": "10px",
				"float": "right",
				cursor: "pointer",
				height: "inherit",
				"width": "75%"
		},
		ol:{
				"boxSizing": "initial",
				listStyle: "none",
				transition: define.style.transition,
				transform: "translateX( -65px )",
				width: "calc( 100% + 65px )",
				margin: "0px",
				padding: "0px",
				height: "80px"
		},
		postTime: {
				"display": "block",
				"textAlign": "right"
		},
		balloon: {
				"display": "block",
				"background": "rgba( 240, 240, 240, 0.98)",
				"padding": "10px",
				"borderRadius": "10px"
		},
		balloonTitle: {
				textOverflow: "ellipsis",
				lineHeight: "27px",
				overflow: "hidden",
				whiteSpace: "nowrap"
		},
		balloonTalk: {
				textOverflow: "ellipsis",
				overflow: "hidden",
				lineHeight: "27px",
				whiteSpace: "nowrap"
		},
		startMoveLeft: "0px"
}
