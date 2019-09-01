import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	if( action.threadDetail ){
		console.log(state);
		console.log( action.threadDetail);

		/*
			マージが失敗しているのが原因でstate.mergeが出来なくなっている
		*/

		const s = state.merge( action.threadDetail );
		console.log( s.merge );
		return s;//state.merge( action.threadDetail );
	}else{
		return state;
	}
};
