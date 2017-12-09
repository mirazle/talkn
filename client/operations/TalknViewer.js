import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Container from 'client/Container'
import define from 'client/util/define'

export default class TalknViewer {
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
