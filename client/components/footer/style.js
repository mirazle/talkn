import define from "../../util/define"

export default {
                       footer: {
				border: "none",
                                "position": "fixed",
                                "bottom": "0px",
                                "left": "0px",
                                "display": "table",
                                "zIndex": "1000",
                                "width": "100%",
                                "height": "70px",
                                "margin": "0",
                                "textAlign": "center",
				"boxShadow": "0px 1px 0px 0px " + define.style.lineColor + " inset",
				"background": define.style.bgColor,
                                "verticalAlign": "middle",
                                "transition": "0ms",
                                "transform": "translate3d( 0px, 0px, 1px )"
                        },
                        footerRow: {
                                "display": "table-row",
                                "width": "100%"
                         },
                        thumArea: {
                                "display": "table-cell",
                                "width": "20%",
                                "height": "inherit",
                                "verticalAlign": "middle"
                        },
                        thum:{
				"borderSpacing": "0px",
				"verticalAlign": "middle",
				"textIndent": "-100000px",
				"border": "0px solid transparent",
				"borderRadius": "100px",
				"background": define.style.userThumL,
				"opacity": define.style.userThumOpacity,
				"height": "45px",
				"maxHeight": "80px"
                        },
                        textareaArea:{
                                "display": "table-cell",
                                "width": "60%",
                                "maxWidth": "60%",
                                "minWidth": "60%",
                                "height": "inherit"
                        },
                        textareaTable:{
                                "display": "table",
                                "width": "100%"
                        },
                        textareaRow:{
                                "display": "table-row"
                        },
                        textareaFocusTheme:{
                                "display": "table-cell",
                                "fontSize": "12px",
                                "width": "60%",
                                "maxWidth": "60%",
                                "whiteSpace": "nowrap",
                                "overflow": "hidden",
                                "textOverflow": "ellipsis",
                                "lineHeight": "18px",
                                "height": "18px"
                        },
                        textareaWrap: {
                                "display": "table-cell",
				"width": "100%",
                                "textAlign": "left"
                        },
                        textarea: {
                                "maxWidth": "95%",
                                "minWidth": "95%",
                                "width": "95%",
                                "height": "23px",
                                "margin": "1px 0px 0px 0px",
				padding: "8px 0% 0px 2%",
                                "paddingLeft": "2%",
                                "paddingTop": "8px",
                                "overflow": "hidden",
                                "wordWrap": "breakWord",
                                "resize": "none",
                                "borderRadius": "5px",
                                "border": "1px solid #ddd",
                                "fontSize": "15px",
                                "lineHeight": "15px",
                                "letterSpacing": "3px",
                                "background": "rgba( 255, 255, 255, 0 )",
				"boxSizing": "content-box",
                                "outline": "none",
                                "transition": "1000ms",
                                "fontWeight": "normal"
                        },
                        btnArea:{
                                "display": "table-cell",
                                "maxWidth": "20%",
                                "minWidth": "20%",
                                "width": "20%"
			}
                
	}

