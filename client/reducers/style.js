import Style from 'client/style/index';
import Main from 'client/style/Main';
import Screen from 'client/style/Screen';
import Menu from 'client/style/Menu';
import Posts from 'client/style/Posts';
import Detail from 'client/style/Detail';
import Footer from 'client/style/Footer';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'TOGGLE_DISP_MAIN':
		return {...state};
	case 'ON_CLICK_MULTISTREAM':
		return {...state,
			posts: {...state.posts,
				multistreamIconWrap: {...state.posts.multistreamIconWrap,
					border: Posts.getMultistreamIconWrapBorder( action)
				}
			},
		}
	case 'ON_CLICK_TOGGLE_DISP_MENU':
	case 'ON_CLICK_TOGGLE_DISP_DETAIL':
		return {...state,
			menu: {...state.menu,
				self: {...state.menu.self,
					width: Menu.getWidth( action.app ),
					transform: Menu.getTransform( action.app ),
				}
			},
			detail: {...state.detail,
				self: {...state.detail.self,
					width: Detail.getWidth( action.app ),
					transform: Detail.getTransform( action.app ),
				}
			},
			screen: {...state.screen,
				self: {...state.screen.self,
					width: Screen.getWidth( action.app ),
					transform: Screen.getTransform( action.app ),
				}
			},
			posts: {...state.posts,
				self: {...state.posts.self,
					width: Posts.getWidth( action.app )
				}
			},
			footer: {...state.footer,
				self: {...state.footer.self,
					width: Footer.getWidth( action.app ),
					transform: Footer.getTransform( action.app ),
				}
			},
		}
	case 'RESIZE_START_WINDOW':
	case 'RESIZE_END_WINDOW':
		return new Style( action );
	case 'OPEN_NOTIF_IN_THREAD':
	case 'CLOSE_NOTIF_IN_THREAD':
		return {...state,
			main: {...state.main,
				notif: {...state.main.notif,
					transform: Main.getNotifTranslateY( action.app ),
				}
			}
		}
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		return {...state,
			screen: {...state.screen,
				self: {...state.screen.self,
					display: Screen.getSelfDisplay( action.app ),
				}
			}
		}
	case 'ON_TRANSITION' :
	case 'OFF_TRANSITION' :
		return new Style( action );
	case 'UPDATE_STYLE':
		const { styleKey, eleType, tagName, style } = action;

		if( styleKey && eleType && tagName ){
			return {...state,
				[ styleKey ]: {...state[ styleKey ],
					[ eleType ]: {...state[ styleKey ][ eleType ],
						[ tagName ]: {...state[ styleKey ][ eleType ][ tagName ], ...style },
					}
				}
			}
		}else if( styleKey && eleType ){
			return {...state,
				[ styleKey ]: {...state[ styleKey ],
					[ eleType ]: {...state[ styleKey ][ eleType ], ...style },
				}
			}
		}
	default:
		return action.style ? action.style : state ;
	}
};
