import define from '../../util/define'

export default {
                        button:{
                                "position": "fixed",
                                "display": "table",
                                "zIndex": "10004",
                                "bottom": "10px",
                                "right": "3%",
                                "width": "65px",
                                "height": "65px",
                                "minHeight": "65px",
                                "maxHeight": "65px",
                                "background": define.style.btnTalknBg,
                                "border": "0",
				margin: "0",
                                "borderRadius": "100px",
                                "boxShadow": "0px 1px 1px 1px #e6e6e6, 0px 0px 30px 0px rgba(230, 230, 230, 0.8 ) inset",
				"transition": "0ms",
                                "transform": "translate3d( 0px, 0px, 10px )",
                                "zIndex": "2147483647",
                                "outline": "none"
			},
			"mousedownFlg": false,
			"mousedownAction": "toggleFooterArea",
			"startMoveWidth": "0px",
			"startMoveHeight": "0px",
			"startMoveScreenX": "0px",
			"startMoveScreenY": "0px",
			"startMoveTop": "0px",
			"startMoveLeft": "0px",
			"beforeMoveTop": "0px",
			"beforeMoveLeft": "0px"
}
