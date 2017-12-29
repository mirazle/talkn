export default ( state = {} , action ) => {
	return action.thread ? action.thread : state ;
};
