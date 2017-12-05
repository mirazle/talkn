import io from 'socket.io-client';
import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import define from 'client/util/define'
import func from 'client/util/func'
import { initClientState } from 'client/actions/initClientState'
import * as stylesAction from 'client/actions/styles'
import * as wsRequestAction from 'client/actions/wsRequest'
import * as wsResponseAction from 'client/actions/wsResponse'
import Container from 'client/Container'
import configureStore from 'client/store/configureStore'
import State from 'common/schemas/state';
import sequence from 'common/sequence';

class TalknSession{

	constructor( state ){
		this.state = state;

		const { appType, talknIndex } = this.state;
		switch( appType ){
		case 'plugin':
			TalknSession.listenChrome();
			break;
		}
	}

	getSetting(){
		const { appType, talknIndex } = state;
		let promiseCondition = () => {};

		switch( appType ){
		case 'plugin':
			promiseCondition = ( resolve, reject ) => {
				chrome.runtime.sendMessage( { method: "getItem", key: define.cacheKey.setting + talknIndex, function(){} } );
			}
			break;
		case 'electron':
		case 'script':
			promiseCondition = ( resolve, reject ) => {
				resolve( { setting: JSON.parse( localStorage.getItem( define.cacheKey.setting + talknIndex ) ), self: self } );
			}
			break;
		}
		return new Promise( promiseCondition );
	}

	static listenChrome(){
		chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {
			// Session setting .
			if( result.requestKey === define.cacheKey.setting + talknIndex ){
				resolve( { setting: result.response, self: self } );
			}

			// Session index .
			if( result.requestKey === define.cacheKey.index + talknIndex ){
				let connectionList = result.response;
				// TODO FIND
				//func.findMap( talknIndex, connectionList, focusMeta );
			}
		});
	}
}

class TalknViewer {
	constructor( state, talknAPI ){
		const { appName, talknIndex } = state;
		this.id = appName + talknIndex;
		this.state = state;
		this.talknAPI = talknAPI;
	}

	static getAppType(){
		if( typeof window.chrome === 'object' ){
			if( typeof window.chrome.runtime === 'object' ){
				if( typeof window.chrome.runtime.getManifest === 'function' ){
					return 'plugin';
				}
			}
		}
		return 'script';
	}

	async render(){
		await this.appendRoot();
		await this.addBackgroundListener();
		await this.renderDOM();
	}

	appendRoot(){
		const { appName, talknIndex } = this.state;
		const container = document.createElement( 'talkn' );
		container.id = this.id;
		document.body.appendChild( container );
		return true;
	}

	addBackgroundListener(){
		const { appType, talknIndex } = this.state;
		let promiseCondition = () => {};

		switch( appType ){
		case 'plugin':
			promiseCondition = ( resolve, reject ) => {
				chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {

					if( result.requestKey === define.cacheKey.setting + talknIndex ){
						resolve( { setting: result.response, self: self } );
					}
/*
					if( result.requestKey === define.cacheKey.index + talknIndex ){
						let connectionList = result.response;

						// TODO FINDはあとでまとめて実行する
						func.findMap( talknIndex, connectionList, focusMeta );
					}
*/
				});

				chrome.runtime.sendMessage( { method: "getItem", key: define.cacheKey.setting + talknIndex, function(){} } );
			}
			break;
		case 'electron':
		case 'script':
			promiseCondition = ( resolve, reject ) => {
				resolve( { setting: JSON.parse( localStorage.getItem( define.cacheKey.setting + talknIndex ) ), self: self } );
			}
			break;
		}
    return new Promise( promiseCondition );
	}

	async renderDOM(){
		ReactDOM.render(
			<Provider store={ this.talknAPI.store }>
				<Container state={ this.state } talknAPI={ this.talknAPI } />
			</Provider>,
			document.getElementById( this.id ),
			() => {}
		)
		return true;
	}
}

class TalknAPI{
	constructor( state, store, ws ){
		const talknIndex = state.talknIndex;
		this.state = state;
		this.talknIndex = state.talknIndex;
		this.store = store;
		this.ws = ws;
		this.connections = [];
		this.attachAPI( 'Style', talknIndex, stylesAction );
		this.attachAPI( 'WsRequest', talknIndex, wsRequestAction );
		this.attachAPI( 'WsResponse', talknIndex, wsResponseAction, ( methodName )=>{
			this.ws.on( methodName, this[ methodName ] );
		} );
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

	attachAPI( type, talknIndex, actions, callback = () => {} ){
		const actionKeys = Object.keys( actions );
		const actionLength = actionKeys.length;

		for( let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++ ){
			const methodName = actionKeys[ actionNodeCnt ];
			if( typeof actions[ methodName ] === 'function' ){
				this[ methodName ] = this[ `get${type}API` ]( talknIndex, methodName );
				callback( methodName );
			}
		}
	}

	getStyleAPI( talknIndex, methodName ){
		return ( params ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const action = stylesAction[ methodName ]( params );
				return talknAPI.store.dispatch( action );
			}
		}
	}

	getWsRequestAPI( talknIndex, methodName ){
		return ( params ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const action = wsRequestAction[ methodName ]( params );
				const requestState = sequence.getRequestState( methodName, params );
				this.ws.emit( methodName, requestState );
			}
		}
	}

	getWsResponseAPI( talknIndex, methodName ){
		return ( response ) => {
			if( TalknAPI.handle( talknIndex ) ){
				const action = wsResponseAction[ methodName ]( response );
				const responseAction = sequence.getResponseState( this.state, action );
				return talknAPI.store.dispatch( responseAction );
			}
		}
	}
}

function bootTalkn( appType, talknIndex, ws, attributes ){
	const store = configureStore();
	const state = new State( appType, talknIndex, window, attributes );
	const talknSession = new TalknSession( state );
	const talknAPI = new TalknAPI( state, store, ws );
	const talknViewer = new TalknViewer( state, talknAPI );

	talknAPI.initClientState( state );
	talknViewer.render();
}

window.onload =  () => {

	const ws = io('//localhost:10001', { forceNew: true });
	const appType = TalknViewer.getAppType();
	window.TalknAPI = TalknAPI;
	window.__talknAPI__ = [];

	switch( appType ){
	case 'plugin':
	case 'electron':
		bootTalkn( appType, 0, ws, {} );
		break;
	case 'script':
		const scripts = document.querySelectorAll('script[src*="talkn.client.js"]');
		scripts.forEach( ( script, index ) => {
			bootTalkn( appType, index + 1 , ws, script.attributes );
 		});

		window.talknAPI = window.__talknAPI__[ 1 ];
	}
}

//console.log( ws.emit( 'initUserState', state ) );
