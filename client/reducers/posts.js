import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	if(action.posts && action.posts[0] ){
		if(state[0] && state[0].createTime){
			// New post .
			if( action.posts[0].createTime > state[0].createTime ){
				return [ ...state, ...action.posts ];

			// Get more .
			}else{
				return [ ...action.posts, ...state ];
			}

		}else{
			return [ ...action.posts, ...state ];
		}
	}
	return state;
};
