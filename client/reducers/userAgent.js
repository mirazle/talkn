import UserAgent from 'common/schemas/state/UserAgent';

export default ( state = new UserAgent() , action ) => {
	return action.userAgent ? state.merge( action.userAgent ) : state ;
};
