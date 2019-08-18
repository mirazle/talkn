import Sequence from 'common/Sequence';

let actions = {};

Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.CLIENT_TO_SERVER_EMIT}${endpoint}`;
	actions[ type ] = ( reduxState, requestState, actionState ) => {
		if( beforeFunctions[ requestState.type ] ){
			return beforeFunctions[ requestState.type ]( reduxState, requestState, actionState );
		}
		return { requestState, actionState };
	}
});

const beforeFunctions = {
	post: ( reduxState, requestState, actionState ) => {
		const { app, thread } = reduxState;
		if( app.isMediaConnection ){
			console.log("CLIENT TO SERER EMIT @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			console.log( window.talknMedia );
			if( window.talknMedia && window.talknMedia.currentTime ){
				console.log("@@@@@@@@@@@@ A " + window.talknMedia.currentTime );
				requestState.app.inputCurrentTime = window.talknMedia.currentTime;
			}else{
				console.log("@@@@@@@@@@@@ B " + 0 );
				requestState.app.inputCurrentTime = 0;
			}
		}

		return { requestState, actionState };
	}
}

export default actions;
