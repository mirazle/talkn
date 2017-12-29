export default ( state = {} , action ) => {
	return action.app ? action.app : state ;
};
