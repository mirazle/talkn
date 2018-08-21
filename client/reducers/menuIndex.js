import MenuIndex from 'common/schemas/state/MenuIndex';

export default ( state = new MenuIndex() , action ) => {

	switch( action.type ){
	case 'SERVER_TO_CLIENT[EMIT]:find':
		return state.map( mi => action.user.connectioned === mi.connection ?
				{...mi,
					watchCnt: action.thread.watchCnt,
					favicon: action.thread.favicon,
					post: action.thread.lastPost.post
				} : mi);
		break;

	/* TODO
		findはwatchCntを増やして配信
		disconnect, changeThreadはwatchCntを減らす
	*/
	case 'SERVER_TO_CLIENT[BROADCAST]:find':
	case 'SERVER_TO_CLIENT[BROADCAST]:changeThread':
	case 'SERVER_TO_CLIENT[BROADCAST]:disconnect':
		return state.map( ( mi ) => {
			if( action.thread.connection === mi.connection ){
				return {...mi,
					watchCnt: action.thread.watchCnt,
				}
			}else{
				return mi
			};
		});
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
