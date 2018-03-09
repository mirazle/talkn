import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	return action.thread ? state.merge( action.thread ) : state ;
};
