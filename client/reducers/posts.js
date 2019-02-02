import Posts from 'common/schemas/state/Posts';
import User from 'common/schemas/state/User';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_TO_MULTI_THREAD':
		return action.postsMulti;
	case 'ON_CLICK_TO_SINGLE_THREAD':
		return action.postsSingle;
	case 'ON_CLICK_TO_CHILD_THREAD':
		return action.postsChild;
	case 'ON_CLICK_TO_ LOGS_THREAD':
		return action.postsLogs;
	}

	return state;
};
