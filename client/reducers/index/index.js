export default ( state = {} , action ) => {
	return action.index ? action.index : state ;
};
