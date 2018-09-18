import User from 'common/schemas/state/User';

export default ( state = new User() , action ) => {
	if( action.user ) console.log( action.user );
	return action.user ? state.merge( action.user ) : state ;
};
