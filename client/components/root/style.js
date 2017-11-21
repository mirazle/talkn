import define from '../../util/define'

export default {
                        "root":{
				boxSizing: "initial",
				fontFamily: define.style.fontFamily,
				"userSelect": "none",
				"color": define.style.fontColor,
				"display": "block",
				"position": "fixed",
				"bottom": "0px",
				"right": "0px",
				"width": "0vw",
				"height": "0vh",
				"transition": "0ms",
				"zIndex": "2147483646"
			},
			uid: 0,
			setting:{
				multiStream: false,
				saveIndex: true,
				myThread: false,
				apiMeta: true,
				apiSocial: true,
				apiMovie: true,
				apiPicture: false,
				apiWikipedia: false,
				apiAnalyze: true,
				drawBgColor2: "rgba( 220, 220, 220, 0.80 )",
				drawBgColor1: "rgba( 0, 150, 150, 0.7 )",
				fontColor1: "rgba( 90, 90, 90, 0.80 )"
			},
			iconOpacityRange:{ max: "0.7", min: "0.1" },
			updateCallback:{
				CHANGE_THREAD: { slideCenter: false },
				CATCH_RESPONSE: { getMoreScroll: false }
			},
			customColor:{
				fontColor: "",
				lineColor: "",
				drawBgColor1: ""
			},
			firstCatchResponseAction: false,
			focusTextarea: null,
			focusMeta:{},
			focusMetaFlg: true,
			option: {}
}
