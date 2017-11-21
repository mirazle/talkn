import define from "../../util/define"

export default {
		indexNotif: {
				display: "block",
				WebkitAnimation: define.style.notifAnimation,
				position: "absolute",
				top: "0px",
				width: "100%",
				height: "70px",
				background: define.style.bgColor,
				borderBottom: "1px solid " + define.style.lineColor,
				boxShadow: "0px 0px 0px 1px " + define.style.lineColor + " inset",
				transform: "translate3d( 0px, 0px, 1px )",
				transition: define.style.transition,
				clear: "both"
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
				display: "block",
				float: "right",
				textAlign: "left",
				width: "80%",
				height: "100%",
				paddingTop: "10px"
		}
}
