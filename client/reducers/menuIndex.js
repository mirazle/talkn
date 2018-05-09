export default ( state = {} , action ) => {
	return action.menuIndex ? action.menuIndex : state ;
};
