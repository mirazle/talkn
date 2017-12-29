export default ( state = {} , action ) => {
	return action.posts ? action.posts : state ;
};
