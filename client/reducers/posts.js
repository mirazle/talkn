import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'UPDATE_POSTS':
		return action.posts;	
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		
		console.log( action );
		console.log( action.thread.connection + " === " + action.posts[0].connection );
		// 										/ === /news.livedoor.com/article/detail/15445930/
//		if( state.connection === action.thread.connection ){
		// サーバー側でconnection毎にBroardcastしているのでこの判定でOK
//		if( action.thread.connection ===  action.posts[0].connection ){
		if( action.thread.connection ===  action.app.rootConnection ){
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
