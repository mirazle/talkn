import Posts from 'common/schemas/state/Posts';

export default ( state = new Posts() , action ) => {

	switch( action.type ){
	case 'ON_CLICK_OTHER_THREAD':
		return new Posts();
	case 'UPDATE_POSTS':
		return {...action.posts};
	default:
		const actionPostLength = action.posts ? action.posts.length : 0;
		const statePostLength = state.length;
		if( actionPostLength > 0 ){
			return setPost( action, state, actionPostLength, statePostLength );
		}
	}

	return state;
};


const setPost = ( action, state, actionPostLength, statePostLength ) => {

	let assginDirection = "APPEND";

	assginDirection = statePostLength === 0 ? "APPEND" : "PREPEND";

	// Append Post .
	if(
		statePostLength === 0 || 
		actionPostLength > 1 ||  
		action.posts[0] && state[0] && action.posts[0].createTime > state[0].createTim
	){
		console.log( "@@@@@ NEW POST!" );
		return [ ...state, ...action.posts ];

	// Prepend Post .
	}else{
		console.log( "@@@@@ GET MORE!" );
		return [ ...action.posts, ...state ];
	}
}