export default ( state = {} , action ) => {
	return action.setting ? action.setting : state ;
};
