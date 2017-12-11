import {PREFIX_RESPONSE} from 'common/sequence';

export default ( state = {} , action ) => {
	return {...state, ...action.user}
};
