import Sequence from 'common/Sequence';
import State from 'common/schemas/state/';

const state = new State();
let wsResponseActions = {};

Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.PREFIX_RESPONSE}${endpoint}`;
	wsResponseActions[ type ] = response => {
    let actionState = {type};
		Object.keys( response ).forEach(( stateKey ) => {
      if( stateKey !== Sequence.REDUX_ACTION_KEY ){
        const stateValue = response[ stateKey ];
        actionState[ stateKey ] = new state[ stateKey ].constructor( stateValue, 'response' );
      }
    });
		return actionState;
	}
});
export default wsResponseActions;
