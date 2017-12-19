import Sequence from 'common/Sequence';

let wsResponseActions = {};
Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.PREFIX_RESPONSE}${endpoint}`;
	wsResponseActions[ type ] = state => {
		return { type, ...state };
	}
});
export default wsResponseActions;
