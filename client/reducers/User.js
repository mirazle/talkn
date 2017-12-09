import {PREFIX_RESPONSE} from 'common/sequence';

export default ( user = {} , action ) => {
	if( action.type.indexOf( PREFIX_RESPONSE ) === 0 ){
		return {...action.user};
	}else{
		return {...action.user};
	}
/*
	switch( action.type ){
	case :
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
*/
};
