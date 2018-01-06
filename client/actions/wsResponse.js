import Sequence from 'common/Sequence';
import State from 'common/schemas/state/';

const state = new State();
let wsResponseActions = {};

Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.PREFIX_RESPONSE}${endpoint}`;
	wsResponseActions[ type ] = response => {
		return {...response, type };
	}
});
export default wsResponseActions;
