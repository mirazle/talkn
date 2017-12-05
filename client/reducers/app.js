export default ( app = {} , action ) => {
	switch( action.type ){
	case "CATCH_RESPONSE":
		return {...action.app}
		break;
	default:
		return app;
	}
};
