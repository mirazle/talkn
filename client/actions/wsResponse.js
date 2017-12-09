import {sequenceMap, PREFIX_RESPONSE} from 'common/sequence';

let wsResponseActions = {};
Object.keys( sequenceMap ).forEach( endpoint => {
	const type = `${PREFIX_RESPONSE}${endpoint}`;
	wsResponseActions[ type ] = state => {
		return { type, ...state };
	}
});
export default wsResponseActions;
