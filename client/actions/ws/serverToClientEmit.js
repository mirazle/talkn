import Sequence from 'common/Sequence';

let actions = {};

Object.keys( Sequence.map ).forEach( endpoint => {
	if( Object.keys( Sequence.map[ endpoint ].responseEmitState ).length > 0 ){
		const type = `${Sequence.SERVER_TO_CLIENT_EMIT}${endpoint}`;
		actions[ type ] = response => {
			return {...response, type };
		}
	}
});
export default actions;
