import {sequenceMap, PREFIX_REQUEST} from 'common/sequence';

let wsRequestActions = {};
Object.keys( sequenceMap ).forEach( endpoint => {
	const type = `${PREFIX_REQUEST}${endpoint}`;
	wsRequestActions[ type ] = state => {
		return { type, ...state };
	}
});
export default wsRequestActions;
