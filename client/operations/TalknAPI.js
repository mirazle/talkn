import {sequenceMap, getRequestState, getResponseState, PREFIX_REQUEST, PREFIX_RESPONSE} from 'common/sequence';
import * as stylesActions from 'client/actions/styles'
import wsRequestActions from 'client/actions/wsRequest'
import wsResponseActions from 'client/actions/wsResponse'

export default class TalknAPI{
	constructor( state, store, ws ){
		const talknIndex = state.talknIndex;
		this.state = state;
		this.talknIndex = state.talknIndex;
		this.store = store;
		this.ws = ws;
		this.connections = [];
		this.attachAPI( 'Style', talknIndex, stylesActions );
		this.attachAPI( 'WsRequest', talknIndex, wsRequestActions );
		this.attachAPI( 'WsResponse', talknIndex, wsResponseActions );

		window.__talknAPI__[ this.state.talknIndex ] = this;
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
					const publicActionName = actionName.replace( PREFIX_REQUEST, '' );
					this[ publicActionName ] = this[ `getWsRequestAPI` ]( talknIndex, actionName );
					break;
				case 'WsResponse':
					const onKey = actionName.replace( PREFIX_RESPONSE, '' );
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

	getWsRequestAPI( talknIndex, actionName ){
		return ( state ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = wsRequestActions[ actionName ]( state );
				const requestState = getRequestState( actionState );
				this.ws.emit( requestState.type, requestState );
				return talknAPI.store.dispatch( actionState );
			}
		}
	}

	getWsResponseAPI( talknIndex, actionName ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const actionState = wsResponseActions[ actionName ]( response );
				const responseAction = getResponseState( this.state, actionState );
				return talknAPI.store.dispatch( responseAction );
			}
		}
	}
}
