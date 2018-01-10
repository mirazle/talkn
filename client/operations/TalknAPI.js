import Sequence from 'common/Sequence';
import * as stylesActions from 'client/actions/styles'
import wsRequestActions from 'client/actions/wsRequest'
import wsResponseActions from 'client/actions/wsResponse'

import WsClientToServerEmitActions from 'client/actions/ws/clientToServerEmit'
import WsServerToClientEmitActions from 'client/actions/ws/serverToClientEmit'
import WsServerToClientBroadcastActions from 'client/actions/ws/serverToClientBradcast'

export default class TalknAPI{
	constructor( talknIndex, store, ws ){
		this.store = store;
		this.ws = ws;
		this.connections = [];
		this.talknIndex = talknIndex;


		this.setAPI( 'Style', stylesActions );
		this.setAPI( 'WsClientToServerEmit', WsClientToServerEmitActions );
		this.setAPI( 'WsServerToClientEmit', WsServerToClientEmitActions );
		this.setAPI( 'WsServerToClientBroadcast', WsServerToClientBroadcastActions );
/*
		this.attachAPI( 'Style', talknIndex, stylesActions );
		this.attachAPI( 'WsRequest', talknIndex, wsRequestActions );
		this.attachAPI( 'WsResponse', talknIndex, wsResponseActions );
*/
		window.__talknAPI__[ talknIndex ] = this;
	}

	static handle( talknIndex ){
		if( typeof __talknAPI__[ talknIndex ] === "undefined" ){
			window.talknAPI = window.__talknAPI__[ talknIndex ];
			return false;
		}else{
			window.talknAPI = window.__talknAPI__[ talknIndex ];
			return true;
		}
	}

	setAPI( handleType, actions ){
		const talknIndex = this.talknIndex;
		const actionKeys = Object.keys( actions );
		const actionLength = actionKeys.length;

		for( let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++ ){
			const actionName = actionKeys[ actionNodeCnt ];
			const handleApiKey = `get${handleType}API`;
			let publicActionName = '';
			let onKey = '';

			if( typeof actions[ actionName ] === 'function' ){
				switch( handleType ){
				case 'Style':
					this[ actionName ] = this[ handleApiKey ]( talknIndex, actionName );
					break;
				case 'WsClientToServerEmit':
					publicActionName = actionName.replace( Sequence.CLIENT_TO_SERVER_EMIT, '' );
					this[ publicActionName ] = this[ handleApiKey ]( talknIndex, actionName );
					break;
				case 'WsServerToClientEmit':
					onKey = actionName.replace( Sequence.SERVER_TO_CLIENT_EMIT, '' );
					this.ws.on( onKey, this[ handleApiKey ]( talknIndex, actionName ));
					break;
				case 'WsServerToClientBroadcast':
					onKey = actionName.replace( Sequence.SERVER_TO_CLIENT_BROADCAST, '' );
					this.ws.on( onKey, this[ handleApiKey ]( talknIndex, actionName ));
					break;
				}
			}
		}
	}

	attachAPI( type, talknIndex, actions ){
		const actionKeys = Object.keys( actions );
		const actionLength = actionKeys.length;

		for( let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++ ){
			const actionName = actionKeys[ actionNodeCnt ];
			if( typeof actions[ actionName ] === 'function' ){
				switch( type ){
				case 'Style':
					this[ actionName ] = this[ `getStyleAPI` ]( talknIndex, actionName );
					break;
				case 'WsRequest':
					const publicActionName = actionName.replace( Sequence.PREFIX_REQUEST, '' );
					this[ publicActionName ] = this[ `getWsRequestAPI` ]( talknIndex, actionName );
					break;
				case 'WsResponse':
					const onKey = actionName.replace( Sequence.PREFIX_RESPONSE, '' );
					this.ws.on( onKey, this[ `getWsResponseAPI` ]( talknIndex, actionName ));
					break;
				}
			}
		}
	}

	getStyleAPI( talknIndex, actionName ){
		return ( params ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const action = stylesActions[ actionName ]( params );
				return talknAPI.store.dispatch( action );
			}
		}
	}

	getWsClientToServerEmitAPI( talknIndex, actionName ){
		return ( requestParams ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const reduxState = this.store.getState();
				const requestState = Sequence.getRequestState( actionName, reduxState, requestParams );
				const actionState = Sequence.getRequestActionState( actionName, requestParams );
				this.ws.emit( requestState.type, requestState );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}

	getWsServerToClientEmitAPI( talknIndex, actionName ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = WsServerToClientEmitActions[ actionName ]( response );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}

	getWsServerToClientBroadcastAPI( talknIndex, actionName ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = WsServerToClientBroadcastActions[ actionName ]( response );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}

	getWsRequestAPI( talknIndex, actionName ){
		return ( requestParams ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const reduxState = this.store.getState();
				const requestState = Sequence.getRequestState( actionName, reduxState, requestParams );
				const actionState = Sequence.getRequestActionState( actionName, requestParams );
				this.ws.emit( requestState.type, requestState );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}

	getWsResponseAPI( talknIndex, actionName ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = wsResponseActions[ actionName ]( response );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}
}
