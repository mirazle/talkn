export default ( user = {} , action ) => {
	switch( action.type ){
	case 'CATCH_RESPONSE':
		return {...action.user}
		break;
	case 'INC':
		return {
			...user,
				num: user.num + 1}
		break;
	default:
		return user;
	}
};
