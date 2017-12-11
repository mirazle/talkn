export default ( state = {} , action ) => {
	return {...state, ...action.app}
};
