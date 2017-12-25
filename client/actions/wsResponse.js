import Sequence from 'common/Sequence';

let wsResponseActions = {};
Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.PREFIX_RESPONSE}${endpoint}`;
	wsResponseActions[ type ] = state => {
		return { ...state, type };
	}
});
export default wsResponseActions;
