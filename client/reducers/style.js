export default ( state = {} , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OPEN_MAIN_BOARD':
		let height = action.user.isDisp ? '400px' : '0px' ;
		return {...state,
			main: {...state.main,
				self: {...state.main.self,
					height,
				}
			}
		}
	default:
		return action.style ? action.style : state ;
	}
};
