import User from 'common/schemas/state/User';

export default ( state = new User() , action ) => {
	return action.user ? state.merge( action.user ) : state ;
};
