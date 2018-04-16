import Container from 'client/style/Container';
import Main from 'client/style/Main';
import Screen from 'client/style/Screen';
import Menu from 'client/style/Menu';
import Posts from 'client/style/Posts';
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
		let detailSelfTransform = action.app.isOpenDetail ?
			DetailModal.openTransform : DetailModal.closeTransform ;

		return {...state,
			detail: {...state.detailModal,
				self: {...state.detailModal.self,
					transform: detailSelfTransform,
				}
			}
		}
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		let notifTranslateY = action.app.isOpenNotif ? -Footer.selfHeight : 0;
		return {...state,
			main: {...state.main,
				notif: {...state.main.notif,
					transform: `translate3d(0px, ${notifTranslateY}px, 0px )`,
				}
			}
		}
 		break;
	case 'UPDATE_APP':

		let settingTransform = state.setting.self.transform;
		let postsTransform = state.posts.self.transform;
		let detailTransform = state.detailModal.self.transform;

		switch(action.app.screenMode){
		case App.screenModeSmallLabel :
			switch(action.app.screenModePointer){
			case 1 :

				break;
			case 2 :

				break;
			case 3 :

				break;
			}
			break;
		case App.screenModeMiddleLabel :
			switch(action.app.screenModePointer){
			case 1 :

				break;
			case 2 :

				break;
			}
			break;
		case App.screenModeLargeLabel :

			break;
		}

		return {...state,
			setting: {...state.setting,
				self: {...state.setting.self,
					transform: settingTransform,
				}
			},
			posts: {...state.posts,
				self: {...state.posts.self,
					transform: postsTransform,
				}
			},
			detailModal: {...state.detailModal,
				self: {...state.detailModal.self,
					transform: detailTransform,
				}
			}
		}
	case 'RESIZE_WINDOW':
		return {...state,
			screen: new Screen( action ),
			menu: new Menu( action ),
			posts: new Posts( action ),
			detail: action.app.screenMode === App.screenModeSmallLabel ? new DetailModal( action ) : new DetailRight( action ),
		}
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
