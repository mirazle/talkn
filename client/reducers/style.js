import Style from 'client/style/index';
import Container from 'client/style/Container';
import Main from 'client/style/Main';
import Screen from 'client/style/Screen';
import Menu from 'client/style/Menu';
import Posts from 'client/style/Posts';
import Detail from 'client/style/Detail';
import DetailModal from 'client/style/DetailModal';
import DetailRight from 'client/style/DetailRight';
import Footer from 'client/style/Footer';
import Icon from 'client/style/Icon';
import App from 'common/schemas/state/App';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_TOGGLE_DISP_MAIN':
		if( action.app.isOpenMainPossible ){
			let mainTranslateY;
			let headTabLeftTransform;
			let headTabRightTransform;
			if(action.app.isOpenMain){
				mainTranslateY = Main.getSelfOpenTranslateY();
				headTabLeftTransform = Icon.getHeadTabLeftOpenTransform;
				headTabRightTransform = Icon.getHeadTabRightOpenTransform;
			}else{
				mainTranslateY = Main.getSelfCloseTranslateY();
				headTabLeftTransform = Icon.getHeadTabLeftCloseTransform;
				headTabRightTransform = Icon.getHeadTabRightCloseTransform;
			}

			return {...state,
				icon: {...state.icon,
					headTab: {...state.icon.headTab,
						left: {...state.icon.headTab.left,
							transform: headTabLeftTransform,
						},
						right: {...state.icon.headTab.right,
							transform: headTabRightTransform,
						},
					}
				},
				main: {...state.main,
					self: {...state.main.self,
						transform: `translate3d(0px, ${mainTranslateY}, 0px )`,
					}
				}
			}
		}
	case 'ON_CLICK_TOGGLE_DISP_MENU':
		let mainScreenTransform = action.app.isOpenMenu ?
			Posts.openIndexTransform : Posts.closeIndexTransform ;

		return {...state,
			main: {...state.main,
				screen: {...state.main.screen,
					transform: mainScreenTransform,
				}
			}
		}
	case 'ON_CLICK_TOGGLE_DISP_DETAIL':
		return {...state,
			detail: {...state.detail,
				self: {...state.detail.self,
					transform: Detail.getSelfTransform( action ),
				}
			}
		}
	case 'RESIZE_START_WINDOW':
	case 'RESIZE_END_WINDOW':
		return new Style( action );
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		return {...state,
			main: {...state.main,
				notif: {...state.main.notif,
					transform: Main.getNotifTranslateY( action.app ),
				}
			}
		}
 		break;
	case 'ON_TRANSITION' :
	case 'OFF_TRANSITION' :
		let transition = Container.getTransitionOn( action.app );
		return {...state,
			detail: {...state.detail,
				self: {...state.detail.self, transition}
			},
			icon: {...state.icon,
				user: {...state.icon.user,
					bottom: {...state.icon.user.bottom, transition}
				},
				detail: {...state.icon.detail,
					bottom: {...state.icon.detail.bottom, transition}
				},
				menu: {...state.icon.menu,
					div: {...state.icon.menu.div, transition}
				}
			},
			main: {...state.main,
				notif: {...state.main.notif, transition}
			},
			posts: {...state.posts,
				ol: {...state.posts.ol, transition}
			},
			screen: {...state.screen,
				self: {...state.screen.self, transition}
			},
		}
		break;
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
