import Sequence from 'common/Sequence';

let actions = {};

Object.keys( Sequence.map ).forEach( endpoint => {
	const type = `${Sequence.CLIENT_TO_SERVER_EMIT}${endpoint}`;
	actions[ type ] = ( reduxState, requestState, actionState ) => {
		if( beforeFunctions[ requestState.type ] ){
			return beforeFunctions[ requestState.type ]( reduxState, requestState, actionState );
		}
		return { requestState, actionState};
	}
});

const beforeFunctions = {
	post: ( reduxState, requestState, actionState ) => {
		const { app, thread } = reduxState;
		console.log( app );
		if( app.isMediaConnection ){
			const src = thread.getMediaSrc();
			const tagType = thread.getMediaTagType();
			const media = document.querySelector(`${tagType}[src='${src}']`)

			console.log("clientToServer @@@@@@@@@ " + talknWindow.mediaCurrentTime );

			if( media && talknWindow.mediaCurrentTime !== 0 ){
				requestState.app.inputCurrentTime = talknWindow.mediaCurrentTime;
				console.log( requestState.app.inputCurrentTime );
				return { requestState, actionState };
			}
		}
		return { requestState, actionState };
	}
}

export default actions;
