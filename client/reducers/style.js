import Container from 'common/schemas/state/Style/Container';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OPEN_THREAD':
		let transformY = action.user.isDisp ? -Container.headerHeight : Container.threadHeight;
		console.log( transformY );
		return {...state,
			thread: {...state.thread,
				self: {...state.thread.self,
					transform: `translate3d(0px, ${transformY}px, 0px )`,
				}
			}
		}
	default:
		return action.style ? action.style : state ;
	}
};
