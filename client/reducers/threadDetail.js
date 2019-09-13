import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	if( action.threadDetail ){
		console.log( "@@@@ REDUCER @@@@" );
		console.log(action.threadDetail.hasSlash);
		console.log( state.hasSlash);
	}
	return action.threadDetail ? state.merge( action.threadDetail ) : state ;
};
