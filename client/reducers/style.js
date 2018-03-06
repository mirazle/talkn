import Container from 'common/schemas/state/Style/Container';
import Main from 'common/schemas/state/Style/Main';
import Detail from 'common/schemas/state/Style/Detail';
import Footer from 'common/schemas/state/Style/Footer';
import Icon from 'common/schemas/state/Style/Icon';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_TOGGLE_DISP_MAIN':
		let mainTranslateY;
		let headTabLeftTransform;
		let headTabRightTransform;
		if(action.user.isOpenMain){
			mainTranslateY = ( -Footer.selfHeight ) + 'px';
			headTabLeftTransform = Icon.getHeadTabLeftOpenTransform;
			headTabRightTransform = Icon.getHeadTabRightOpenTransform;
		}else{
			mainTranslateY = Main.getSelfHeightPx();
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
	case 'ON_CLICK_TOGGLE_DISP_SETTING':
		let mainScreenTransform = action.user.isOpenSetting ?
			Main.openSettingTransform : Main.closeSettingTransform ;

		return {...state,
			main: {...state.main,
				screen: {...state.main.screen,
					transform: mainScreenTransform,
				}
			}
		}
	case 'ON_CLICK_TOGGLE_DISP_DETAIL':
		let detailSelfTransform = action.user.isOpenDetail ?
			Detail.openTransform : Detail.closeTransform ;

		return {...state,
			detail: {...state.detail,
				self: {...state.detail.self,
					transform: detailSelfTransform,
				}
			}
		}
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		let notifTranslateY = action.user.isOpenNotif ? -Footer.selfHeight : 0;
		return {...state,
			main: {...state.main,
				notif: {...state.main.notif,
					transform: `translate3d(0px, ${notifTranslateY}px, 0px )`,
				}
			}
		}
		break;
	default:
		return action.style ? action.style : state ;
	}
};
