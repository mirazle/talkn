import io from 'socket.io-client';
import Sequence from 'common/Sequence';
import define from 'common/define';
import conf from 'client/conf';
import handleActions from 'client/actions/handles'
import WsServerToClientEmitAction from 'client/actions/ws/serverToClientEmit'
import WsClientToServerEmitActions from 'client/actions/ws/clientToServerEmit'
import WsServerToClientBroadcastAction from 'client/actions/ws/serverToClientBradcast'

export default class TalknAPI{
	constructor( talknIndex, store, state, connection ){
		const { server } = conf;
		const { PORTS } = define;
		this.ws = io(`https://${server}:${PORTS.SOCKET_IO}`, { forceNew: true });
		this.talknIndex = talknIndex;
		this.store = store;
		this.state = state;
		this.connectionKeys = [];
		this.connection = connection;

		// CLIENT API's
		this.onHandleAPI();

		// COMMUNUCATION API’s
		this.onCatchMeAPI();
		this.onCatchConnectionAPI();
		this.onTalknAPI();

		window.__talknAPI__[ talknIndex ] = this;
	}

	static handle( talknIndex ){
		if( typeof __talknAPI__[ talknIndex ] === "undefined" ){
			throw `BAD TALKN_API HANDLE TALKN_INDEX ${talknIndex}.`;
		}else{
			window.talknAPI = window.__talknAPI__[ talknIndex ];
			return true;
		}
	}

	onHandleAPI(){
		const actions = handleActions;
		const talknIndex = this.talknIndex;
		const actionKeys = Object.keys( actions );
		const actionLength = actionKeys.length;
		for( let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++ ){
			const actionName = actionKeys[ actionNodeCnt ];
			this[ actionName ] = this.getHandleAPI( talknIndex, actionName );
		}
	}

	onCatchMeAPI(){
		const talknIndex = this.talknIndex;
		const callback = this.getToMeAPI(talknIndex, WsServerToClientEmitAction);
		this.on( Sequence.CATCH_ME_KEY, callback );
	}

	onCatchConnectionAPI( connection = this.connection ){
		const talknIndex = this.talknIndex;
		const callback = this.getCatchConnectionAPI(talknIndex, WsServerToClientBroadcastAction);
		this.on( connection, callback );
	}

	offCatchConnectionAPI( connection = this.connection ){
		const talknIndex = this.talknIndex;
		this.off( connection );
	}

	onTalknAPI(){
		const actions = WsClientToServerEmitActions;
		const talknIndex = this.talknIndex;
		const actionKeys = Object.keys( actions );
		const actionLength = actionKeys.length;

		for( let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++ ){
			const actionName = actionKeys[ actionNodeCnt ];
			const actionPlainName = actionName.replace( Sequence.CLIENT_TO_SERVER_EMIT, '' );
			const beforeFunction = actions[ actionName ];
			this[ actionPlainName ] = this.getTalknAPI( talknIndex, actionName, beforeFunction );
		}
	}

	on( onKey, callback = () => {} ){
		if( !this.connectionKeys.includes( onKey ) ){
			this.ws.on( onKey, callback );
			this.connectionKeys.push( onKey );
		}
	}

	off( offKey ){
		this.ws.off( offKey );
		this.connectionKeys = this.connectionKeys.filter( key =>  key === offKey );
	}

	getHandleAPI( talknIndex, actionName ){
		return ( params ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const action = handleActions[ actionName ]( params );
				const reduxState = window.talknAPI.store.getState();
				return window.talknAPI.store.dispatch( action );
			}
		}
	}

	getTalknAPI( talknIndex, actionName, beforeFunction ){
		return ( _requestParams ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const reduxState = window.talknAPI.store.getState();
				let _requestState = Sequence.getRequestState( actionName, reduxState, _requestParams );
				let _actionState = Sequence.getRequestActionState( actionName, _requestParams );
				const { requestState, actionState, } = beforeFunction( reduxState, _requestState, _actionState );
				this.ws.emit( requestState.type, requestState );
				return window.talknAPI.store.dispatch( actionState );
			}
		}
	}

	getToMeAPI( talknIndex, action ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = action( response );
				return window.talknAPI.store.dispatch( actionState );
			}
		}
	}

	getCatchConnectionAPI( talknIndex, actionMethod ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = actionMethod( response );
				return window.talknAPI.store.dispatch( actionState );
			}
		}
	}
}
