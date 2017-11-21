import define from "../../util/define"

export default {
		"slide": { 
			"position": "absolute",
			"left": "-100%",
			"transition": "0ms",
			"transform": "translate3d( 0px, 0px, 0px )",
			"overflow": "hidden",
			"fontSize": "0",
			"fontFamily": define.style.fontFamily,
			"letterSpacing": "1px",
			"padding": "0",
			"margin": "0",
			"whiteSpaces": "nowrap",
			"width": "calc( 100% * 3 )",
			"height": "calc( 100% - 61px )"
		},
		mode:{
			"%":{
				"screen1":{
					"left": "-100%",
					"width": "calc( 100% * 3 )"
				},
				"screen2":{
					"left": "0%",
					"width": "calc( 100% + ( 100% - 300px ) )"
				},
				"screen3":{
					"left": "0%",
					"width": "100%"
				}
			},
			"px":{
				"screen1":{
					"left": "-100%",
					"width": "calc( 100% * 3 )"
				},
				"screen2":{
					"left": "0%",
					"width": "calc( 100% + ( 100% - 300px ) )"
				},
				"screen3":{
					"left": "0%",
					"width": "100%"
				}
			}
		},
		stickFlg: false,
		openPage: 'Thread',
		stickSlideMoveCnt: [],
		stickSlideActiveCnt: 10,
		openMode: 1,
		direction: '',
		distX: "0px",
		startMoveWidth: "0px",
		startMoveHeight: "0px",
		startMoveScreenX: "0px",
		startMoveScreenY: "0px",
		beforeMoveTop: "0px",
		beforeMoveLeft: "0px",
		startMoveTop: "0px",
		startMoveLeft: "0px"
}
