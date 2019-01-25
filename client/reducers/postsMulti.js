import Posts from 'common/schemas/state/Posts';
import User from 'common/schemas/state/User';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return [ ...state, ...action.posts ];
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
