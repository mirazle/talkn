export default ( state = {} , action ) => {
	return {...state,
		index: action.index,
	}
};
