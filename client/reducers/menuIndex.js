import MenuIndex from 'common/schemas/state/MenuIndex';

export default ( state = new MenuIndex() , action ) => {

	switch( action.type ){
	case 'SERVER_TO_CLIENT[EMIT]:find':
		return state.map( mi => action.user.connectioned === mi.connection ?
				{...mi,
					favicon: action.thread.favicon,
					post: action.thread.lastPost.post
				} : mi);
		break;
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		return state.map( mi => action.posts[ 0 ].connection === mi.connection ?
				{...mi,
					favicon: action.posts[ 0 ].favicon,
					post: action.posts[ 0 ].post
				} : mi);
	default:
		return action.menuIndex ? state.merge( action.menuIndex ) : state ;
		break;
	}
};
