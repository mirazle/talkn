import Container from 'common/schemas/state/Style/Container';

export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OPEN_MAIN_BOARD':
		let height = action.user.isDisp ? Container.openHeight : Container.closeHeight ;
		let bottom = action.user.isDisp ? Container.openBottom : Container.closeBottom ;
		return {...state,
			main: {...state.main,
				self: {...state.main.self,
					height,
					bottom,
				}
			}
		}
	default:
		return action.style ? action.style : state ;
	}
};
