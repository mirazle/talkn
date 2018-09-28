import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'UPDATE_POSTS':
		return action.posts;	
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		console.log( action.app.rootConnection );
		console.log( action.posts[0].connection );
		console.log( action );
		if( action.user.uid === action.posts[0].uid || action.app.rootConnection !== action.thread.connection ){
			return [ ...state, ...action.posts ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:find':
		if( action.posts && action.posts.length > 0 ){
			return [ ...state, ...action.posts ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		return [ ...action.posts, ...state ];
	}

	return state;
};
