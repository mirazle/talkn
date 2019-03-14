import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {

	switch( action.type ){
	case 'CLIENT_TO_SERVER[EMIT]:initClientState':
		return action.thread ? state.merge( action.thread ) : state ;		
	case 'SERVER_TO_CLIENT[BROADCAST]:find':
	case 'SERVER_TO_CLIENT[BROADCAST]:changeThread':
	case 'SERVER_TO_CLIENT[BROADCAST]:disconnect':
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		// サーバー側でconnection毎にBroardcastしているのでこの判定でOK
		if( state.connection === action.thread.connection ){
			return action.thread ? state.merge( action.thread ) : state ;
		}
		break;
	default:
		return action.thread ? state.merge( action.thread ) : state ;
	}
	return state;
};
