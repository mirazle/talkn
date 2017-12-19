import Sequence from 'common/Sequence';

let wsRequestActions = {};
Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.PREFIX_REQUEST}${endpoint}`;
	wsRequestActions[ type ] = state => {
		return { type, ...state };
	}
});
export default wsRequestActions;
