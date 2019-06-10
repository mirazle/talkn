export default ( state = new Array() , action ) => {
	return action.componentDidMounts && !state.includes( action.componentDidMounts ) ?
		[ ...state,  action.componentDidMounts] : state ;
};
