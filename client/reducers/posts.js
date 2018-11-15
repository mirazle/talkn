import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'UPDATE_POSTS':
		return action.posts;	
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		console.log(action);

		if(action.app.multistream){
			if( action.thread.connection ===  action.app.rootConnection ){
				return [ ...state, ...action.posts ];
			}
		}else{
			if( action.thread.connection ===  action.posts[0].connection ){
				return [ ...state, ...action.posts ];
			}
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:find':
		if( action.existResponsePostFlg && action.posts && action.posts.length > 0 ){
			return [ ...state, ...action.posts ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		return [ ...action.posts, ...state ];
	}

	return state;
};
