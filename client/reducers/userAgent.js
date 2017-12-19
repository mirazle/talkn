export default ( state = {} , action ) => {
	return {...state, ...action.userAgent}
};
