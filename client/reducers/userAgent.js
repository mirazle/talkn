export default ( state = {} , action ) => {
	return action.userAgent ? action.userAgent : state ;
};
