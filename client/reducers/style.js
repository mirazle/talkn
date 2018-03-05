import Container from 'common/schemas/state/Style/Container';
import Thread from 'common/schemas/state/Style/Thread';
import Footer from 'common/schemas/state/Style/Footer';
import Icon from 'common/schemas/state/Style/Icon';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_TOGGLE_DISP_THREAD':
		let threadTranslateY;
		let headTabLeftTransform;
		let headTabRightTransform;
		if(action.user.isOpenThread){
			threadTranslateY = ( -Footer.selfHeight ) + 'px';
			headTabLeftTransform = Icon.getHeadTabLeftOpenTransform;
			headTabRightTransform = Icon.getHeadTabRightOpenTransform;
		}else{
			threadTranslateY = Thread.getSelfHeightPx();
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
			thread: {...state.thread,
				self: {...state.thread.self,
					transform: `translate3d(0px, ${threadTranslateY}, 0px )`,
				}
			}
		}
	case 'OPEN_NOTIF':
	case 'CLOSE_NOTIF':
		let notifTranslateY = action.user.isOpenNotif ? -Footer.selfHeight : 0;
		return {...state,
			thread: {...state.thread,
				notif: {...state.thread.notif,
					transform: `translate3d(0px, ${notifTranslateY}px, 0px )`,
				}
			}
		}
		break;
	default:
		return action.style ? action.style : state ;
	}
};
