import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {
	switch( action.type ){
	case "CLIENT_TO_SERVER[EMIT]:changeThread":
		return new Posts();
	case "UNMOUNT_POSTS_TIMELINE":
		return state.map( (pt) => {
			pt.dispFlg = ( pt.currentTime <= action.mediaCurrentTime );
			return pt;
		});
	case "CLEAR_POSTS_TIMELINE":
		return state.filter( (pt) => pt.currentTime <= action.mediaCurrentTime );
	case 'SERVER_TO_CLIENT[EMIT]:find':
		if( action.postsTimeline && action.postsTimeline.length > 0 ){
			return [ ...state, ...action.postsTimeline ];
		}
		break;
	case 'NEXT_POSTS_TIMELINE':
		if( action.postsTimeline && action.postsTimeline.length > 0 ){
			return [ ...state, ...action.postsTimeline ];
		}
		break;
	case 'PREV_POSTS_TIMELINE':
		if( action.postsTimeline && action.postsTimeline.length > 0 ){
			return [ ...action.postsTimeline ];
		}
		break;
	case 'SERVER_TO_CLIENT[BROADCAST]:post':
		if(
			action.postsTimeline　&&
			action.postsTimeline.length > 0 &&
			action.postsTimeline[ 0 ].uid === action.user.uid &&
			action.postsTimeline[ 0 ].connection === action.thread.connection
		){
			if( action.postsTimeline && action.postsTimeline.length > 0 ){
				return [ ...state, ...action.postsTimeline ];
			}
		}
		break;
	case 'SERVER_TO_CLIENT[EMIT]:getMore':
		if( action.postsTimeline && action.postsTimeline.length > 0 ){
			return [ ...action.postsTimeline, ...state ];
		}
		break;
	}
	return state;
};
