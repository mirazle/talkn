import Container from 'common/schemas/state/Style/Container';
import Thread from 'common/schemas/state/Style/Thread';
import Footer from 'common/schemas/state/Style/Footer';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_TOGGLE_DISP_THREAD':
		let threadTranslateY = action.user.isOpenThread ?
			( -Footer.selfHeight ) + 'px':
			Thread.getSelfHeightPx();

		return {...state,
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
