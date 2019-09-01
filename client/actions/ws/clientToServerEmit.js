import Sequence from 'common/Sequence';
import Emotions from '~/common/emotions/index';
import PostState from 'common/schemas/state/Post';

const emotions = new Emotions();
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

		requestState.thread.emotions = {};

		if( app.inputStampId ){

			Object.keys( emotions.balances ).forEach( ( balanceKey ) => {

				if( emotions.balances[ balanceKey ] && reduxState.thread.emotions[ balanceKey ] ){

					const balance = emotions.balances[ balanceKey ]( app.inputStampId );

					if( balance ){

						balance.forEach( ( b ) => {
							const typeId = Object.keys( b )[ 0 ];
							const typeLabel = emotions.idKeyTypes[ typeId ];

							if( !requestState.thread.emotions[ balanceKey ] ) requestState.thread.emotions[ balanceKey ] = {}
							if( !requestState.thread.emotions[ balanceKey ][ typeLabel ] ) requestState.thread.emotions[ balanceKey ][ typeLabel ] = 0;
							//if( !actionState.thread ) actionState.thread = reduxState.thread;

							requestState.thread.emotions[ balanceKey ][ typeLabel ] = b[ typeId ];

							console.log( actionState );
							//actionState.thread.emotions[ balanceKey ][ typeLabel ] = reduxState.thread.emotions[ balanceKey ][ typeLabel ] + b[ typeId ];
						} );
					}
				};
			} );
		}

		return { requestState, actionState };
	}
}

export default actions;
