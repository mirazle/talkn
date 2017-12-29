export default ( state = {} , action ) => {
	return action.style ? action.style : state ;
};
