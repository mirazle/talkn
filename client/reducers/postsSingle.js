import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	switch( action.type ){
//	case "ON_CLICK_TO_SINGLE_THREAD":
//		return action.postsSingle;		
	case "ON_CLICK_MULTISTREAM":
	case "CLIENT_TO_SERVER[EMIT]:changeThread":
		return new Posts();
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		if( action.thread.connection ===  action.posts[0].connection ){
			return [ ...state, ...action.posts ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:find':
		if( action.app.rootConnection === action.thread.connection){
			const findPostsSingle = action.posts.filter( post => post.connection === action.thread.connection);
			return [ ...state, ...findPostsSingle ];
		}
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		if( action.app.rootConnection === action.thread.connection){
			const getMorePostsSingle = action.posts.filter( post => post.connection === action.thread.connection);
			return [ ...getMorePostsSingle, ...state ];
		}
	}
	return state;
};
