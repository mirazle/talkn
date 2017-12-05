export default ( state = [ 
], action ) => {
	return [ action.type, ...state ];
};
