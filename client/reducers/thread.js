import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {

	switch( action.type ){
	case 'SERVER_TO_CLIENT[BROADCAST]:changeThread':
		if( state.connection === action.thread.connection ){
			return action.thread ? state.merge( action.thread ) : state ;
		}
		break
	default:
		return action.thread ? state.merge( action.thread ) : state ;
		break;
	}
	return state;
};
