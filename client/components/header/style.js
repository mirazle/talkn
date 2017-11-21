import define from "../../util/define"

export default {
		"header": { 
			display: "table",
			position: "relative",
			top: "0px",
			zIndex: "1001",
			background: "none",
			width: "100%",
			maxWidth: "inherit",
			minWidth: "inherit",
			height: "33px",
			userSelect: "none",
			boxShadow: " 0px 0px 0px 0px rgba( 255,255,255,0 )",
			transform: "translate3d( 0px, 0px, 10px )",
			maxHeight: "33px"
		},
		openIndex:{
			display: "table-cell",
			textAlign: "center",
			fontSize: "13px",
			width: "20%",
			minWidth: "20%",
			maxWidth: "20%"
		},
		watchCnt:{
			display: "none"
		},
                connection:{
			display: "table-cell",
			fontSize: "12px",
			width: "60%",
			minWidth: "60%",
			maxWidth: "1px",
			lineHeight: "16px",
			height: "16px",
			textAlign: "center",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis"
		},
		openSetting:{
			background: "none",
			display: "table-cell",
			width: "20%",
			minWidth: "20%",
			cursor: "pointer",
			maxWidth: "20%"
		},
		connectionEllipsis:{
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis"
		}
}
