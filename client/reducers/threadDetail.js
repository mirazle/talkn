import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	console.log(action.threadDetail);
	console.log( state );
	return action.threadDetail ? state.merge( action.threadDetail ) : state ;
};
