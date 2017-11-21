import define from '../../util/define'

export default {
			"main":{
				"width": "100%",
				"height": "100%",
				"overflowX": "hidden",
				"overflowY": "visible",
				"background": define.style.bgColor,
				"boxSizing": "border-box",
				"border": "1px solid " + define.style.lineColor,
				"borderRadius": "4px",
				"zIndex": "1",
				"transition": "0ms",
				"transform": "translate3d( 0px, 0px, 0px )"
			},
			"possibleMotionFlg": true
}
