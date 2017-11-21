import define from "../../util/define"

export default {
			"container":{
				"display": "block",
				"position": "fixed",
				"bottom": "5px",
				"right": "none",
				"left": "none",
				"margin": "0 auto",
				"padding": "6px 4px 4px 4px",
				"margin": "0",
				"width": define.style.defaultTalknWidth,
				"minWidth": "300px",
				"maxWidth": "100vw",
				"height": define.style.displayAreaHeight,
				"minHeight": define.style.displayAreaHeight,
				"maxHeight": "100vh",
				"overflow": "hidden",
				"boxSizing": "initial",
				"transition": '0ms',
				"transform": "translate3d( 0px, 0px, 0px )"
                        },
                        "startMoveWidth": "0px",
                        "startMoveHeight": "0px",
                        "startMoveScreenX": "0px",
                        "startMoveScreenY": "0px",
                        "beforeMoveTop": "0px",
                        "beforeMoveLeft": "0px",
                        "startMoveTop": "0px",
                        "startMoveLeft": "0px"
}
