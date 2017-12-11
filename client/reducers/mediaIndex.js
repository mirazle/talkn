export default ( state = {} , action ) => {
	return {...state, ...action.mediaIndex}
};
