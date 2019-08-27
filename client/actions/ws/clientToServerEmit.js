import Sequence from 'common/Sequence';
import PostState from 'common/schemas/state/Post';

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
		const { app } = reduxState;
		if( app.isMediaConnection ){
			if( window.talknMedia && window.talknMedia.currentTime ){
				requestState.app.inputCurrentTime = window.talknMedia.currentTime;
			}else{
				requestState.app.inputCurrentTime = 0;
			}
		}
		requestState.app.inputIsStamp = PostState.isStamp( requestState.app.inputPost );

		return { requestState, actionState };
	}
}

export default actions;
