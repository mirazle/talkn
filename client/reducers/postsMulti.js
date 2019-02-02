import Posts from 'common/schemas/state/Posts';
import User from 'common/schemas/state/User';

export default ( state = new Posts() , action ) => {
	switch( action.type ){
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		if( action.app.rootConnection === action.thread.connection){
			return [ ...state, ...action.posts ];
		}
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
