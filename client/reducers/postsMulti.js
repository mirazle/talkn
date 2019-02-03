import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	switch( action.type ){
	case "ON_CLICK_MULTISTREAM":
		return action.postsMulti;
	case "CLIENT_TO_SERVER[EMIT]:changeThread":
		return new Posts();
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return [ ...state, ...action.posts ];
	case 'SERVER_TO_CLIENT[EMIT]:find':
		if( action.app.rootConnection === action.thread.connection){
			if( action.existResponsePostFlg && action.posts && action.posts.length > 0 ){
					return [ ...state, ...action.posts ];
			}
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		if( action.app.rootConnection === action.thread.connection){
			return [ ...action.posts, ...state ];
		}
	}
	return state;
};
