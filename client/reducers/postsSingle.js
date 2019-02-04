import Posts from 'common/schemas/state/Posts';
import User from 'common/schemas/state/User';

export default ( state = new Posts() , action ) => {
	switch( action.type ){	
	case "ON_CLICK_MULTISTREAM":
		return action.postsSingle;
	case "CLIENT_TO_SERVER[EMIT]:changeThread":
		return new Posts();
	case 'SERVER_TO_CLIENT[EMIT]:find':
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		if( action.postsSingle && action.postsSingle.length > 0 ){
			return [ ...state, ...action.postsSingle ];
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		if( action.postsSingle && action.postsSingle.length > 0 ){
			return [ ...action.postsSingle, ...state ];
		}
		break;
	}
	return state;
};
