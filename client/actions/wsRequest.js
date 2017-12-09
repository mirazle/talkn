import {sequenceMap} from 'common/sequence';

let wsRequestActions = {};
Object.keys( sequenceMap ).forEach( endpoint => {
	const type = endpoint;
	wsRequestActions[ type ] = state => {
		return { type, ...state };
	}
});
export default wsRequestActions;
