import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	return action.threadDetail ? state.merge( action.threadDetail ) : state ;
};
