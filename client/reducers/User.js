import User from 'common/schemas/state/User';

export default ( state = new User() , action ) => {
/*
	switch( action.type ){
	case 'SERVER_TO_CLIENT[EMIT]:find':
		return state;
	default:
*/
		return action.user ? state.merge( action.user ) : state ;
/*
	}
*/
};
