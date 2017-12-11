export default ( state = {} , action ) => {
	return {...state, ...action.meta}
};
