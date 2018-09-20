import PostSingle from 'common/schemas/state/PostSingle';

export default ( state = new PostSingle() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new PostSingle();
		break;
	case 'UPDATE_SETTING':
		if( action.updateColumn === "multistream" ){
			return new PostSingle();
		}
		break;
	default:
		
		if( action.posts && action.posts[0] ){
			if(state[0] && state[0].createTime){
				if( action.thread.connection === state[ 0 ].connection ){

					// New post .
					if( action.posts[0].createTime > state[0].createTime ){

						return [ ...state, ...action.posts ];

					// Get more .
					}else{
						return [ ...action.posts, ...state ];
					}
				}

			// Other Thread Post .
			}else{
				return [ ...action.posts, ...state ];
			}
		}
		break;
	}

	return state;
};
