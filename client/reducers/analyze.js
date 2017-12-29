export default ( state = {} , action ) => {
	return action.analyze ? action.analyze : state ;
};
