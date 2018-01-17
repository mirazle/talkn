import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Container from 'client/Container'
import define from 'client/util/define'
import timeago from 'timeago.js';
import lang from 'timeago.js/locales/ja';

export default class TalknViewer {
	constructor( state, talknAPI ){
		const { appName, talknIndex } = state;
		this.id = appName + talknIndex;
		this.state = state;
		this.talknAPI = talknAPI;

//		React.initializeTouchEvents( true );

		Math.easeInOutQuad = function (t, b, c, d) {
			t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		};
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
				<Container talknAPI={ this.talknAPI } timeago={new timeago()} />
			</Provider>,
			document.getElementById( this.id ),
			() => {}
		)
		return true;
	}
}
