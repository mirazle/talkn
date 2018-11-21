import User from 'common/schemas/state/User';

export default ( state = new User() , action ) => {
	action.user = action.user ?
		{...action.user, actioned: action.type} :
		{actioned: action.type}	;
	return action.user ? state.merge( action.user ) : state ;
};
