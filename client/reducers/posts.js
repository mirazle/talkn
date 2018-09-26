import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'UPDATE_POSTS':
		return action.posts;	
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		// Prepend Post .
		return [ ...action.posts, ...state ];
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
	case 'SERVER_TO_CLIENT[EMIT]:find':

		const actionPostLength = action.posts ? action.posts.length : 0;
		const statePostLength = state.length;

		if( actionPostLength > 0 ){

			// Append Post .
			if(
				statePostLength === 0 || 
				actionPostLength >= 1 ||  
				action.posts[0] && state[0] && action.posts[0].createTime > state[0].createTim
			){
				return [ ...state, ...action.posts ];
			}
		}
		break;
	}

	return state;
};
