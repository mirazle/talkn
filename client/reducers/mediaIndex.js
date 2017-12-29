export default ( state = {} , action ) => {
	return action.mediaIndex ? action.mediaIndex : state ;
};
