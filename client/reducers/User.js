export default ( state = {} , action ) => {
//	console.log('---- REDUCER ----');
//	console.log(state);
//	console.log(action);
	// WS関連はtalknAPIでnew stateしてImmutableになっているが、
	// 普通のactionは
	return action.user ? action.user : state ;

/*
	if( state.merge ){
		if( action.user ){
			console.log(action.user);
			return state.merge( action.user );
		}else{
			return state;
		}
	}

	if( action.user ){
		return action.user;
	}
	return state;
*/
};
