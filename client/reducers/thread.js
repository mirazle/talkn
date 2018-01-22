import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	console.log(action.type);
	switch( action.type ){
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return state.merge({postCnt: state.postCnt + 1 });
	default :
		return action.thread ? state.merge( action.thread ) : state ;
	}
};
