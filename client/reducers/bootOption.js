export default ( state = {} , action ) => {
	return action.bootIndex ? action.bootIndex : state ;
};
