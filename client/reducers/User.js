export default ( state = {} , action ) => {
	return action.user ? action.user : state ;
};
