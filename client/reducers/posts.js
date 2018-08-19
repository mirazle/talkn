import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
		break;
	default:
console.log("A");
console.log(action);
console.log(state);
		if( action.posts && action.posts[0] ){
console.log("B");
			if(state[0] && state[0].createTime){
console.log("C");
				if( action.thread.connection === state[ 0 ].connection ){
console.log("D");
					// New post .
					if( action.posts[0].createTime > state[0].createTime ){
console.log("E");
						return [ ...state, ...action.posts ];

					// Get more .
					}else{
console.log("F");
						return [ ...action.posts, ...state ];
					}
				}

			// Other Thread Post .
			}else{
console.log("G");
				return [ ...action.posts, ...state ];
			}
		}
		break;
	}

	return state;
};
