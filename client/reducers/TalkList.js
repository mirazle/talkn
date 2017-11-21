export default ( state = {} , action ) => {
	switch ( action.type ) {
	case 'CONNECTIONED':
		return {...state,
			User: action.User,
		}
	default:
		return state;
	}
};
