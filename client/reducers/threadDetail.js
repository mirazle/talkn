import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	if( action.threadDetail ){
		const s = state.merge( action.threadDetail );
		console.log( action.threadDetail );
		console.log( s );
		return state.merge( action.threadDetail );
	}else{
		return state;
	}
};
