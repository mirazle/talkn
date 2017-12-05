export default ( style = {} , action ) => {
	switch( action.type ){
	case "CATCH_RESPONSE":
		return {...action.style}
		break;
	default:
		return style;
	}
};
