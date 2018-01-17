import Container from 'common/schemas/state/Style/Container';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OPEN_MAIN_BOARD':
		let transformY = action.user.isDisp ? -Container.headerHeight : Container.mainHeight;
		return {...state,
			main: {...state.main,
				self: {...state.main.self,
					transform: `translate3d(0px, ${transformY}px, 0px )`,
				}
			}
		}
	default:
		return action.style ? action.style : state ;
	}
};
