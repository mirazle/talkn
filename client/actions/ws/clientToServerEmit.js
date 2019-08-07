import Sequence from 'common/Sequence';
import TalknMedia from 'client/operations/TalknMedia';

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

/*
	ReducerでTIMELINEのLINKが表示されないようになっている？
*/

const beforeFunctions = {
	post: ( reduxState, requestState, actionState ) => {
		const { app, thread } = reduxState;
		if( app.isMediaConnection ){
			if( window.talknMedia ){
				requestState.app.inputCurrentTime = window.talknMedia.currentTime;
			}else{
				requestState.app.inputCurrentTime = 0;
			}
		}
		return { requestState, actionState };
	}
}

export default actions;
