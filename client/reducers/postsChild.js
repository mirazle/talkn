import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	switch( action.type ){
	case "CLIENT_TO_SERVER[EMIT]:changeThread":
		return new Posts();
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		if( action.thread.connection ===  action.posts[0].connection ){
			return [ ...state, ...action.posts ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:find':
		const findPostsChild = action.posts.filter( post => post.connection === action.thread.connection);
		return [ ...state, ...findPostsChild ];
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		const getMorePostsChild = action.posts.filter( post => post.connection === action.thread.connection);
		return [ ...getMorePostsChild, ...state ];
	}
	return state;
};
