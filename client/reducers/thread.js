export default ( state = {} , action ) => {
	return {...state, ...action.thread}
};
