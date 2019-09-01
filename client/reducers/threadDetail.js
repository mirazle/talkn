import Thread from 'common/schemas/state/Thread';

export default ( state = new Thread() , action ) => {
	if( action.threadDetail ){
		return state.merge( action.threadDetail );
	}else{
		return state;
	}
};
