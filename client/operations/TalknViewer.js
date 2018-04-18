import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Container from 'client/Container'
import ContainerStyle from 'client/style/Container';
import define from 'client/util/define'
import timeago from 'timeago.js';
import lang from 'timeago.js/locales/ja';

export default class TalknViewer {

	static get resizeInterval(){ return Math.floor(1000 / 60 * 10) };

	constructor( state, talknAPI ){
		const { appName, talknIndex } = state;
		this.id = appName + talknIndex;
		this.talknIndex = talknIndex;
		this.state = state;
		this.talknAPI = talknAPI;
		this.resizeTimer = false;
		this.resizing = false;

		this.resize = this.resize.bind( this );
		this.resizeStartWindow = this.resizeStartWindow.bind( this );
		this.resizeEndWindow = this.resizeEndWindow.bind( this );
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
		this.resizeEndWindow();
		await this.addBackgroundListener();
		await this.renderDOM();
	}

	addWindowEventListener( talknAPI ){
		window.addEventListener('resize', this.resize );
	}

	resize( ev ){
		if ( !this.resizing ) this.resizeStartWindow();
		if ( this.resizeTimer !== false ) clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout( this.resizeEndWindow, TalknViewer.resizeInterval );
	}

	resizeStartWindow(){
		this.resizing = true;
		const width = window.innerWidth;
		const height = window.innerHeight;
		const app = talknAPI.store.getState().app.merge({width, height});;
		talknAPI.onResizeStartWindow( app );
	}

	resizeEndWindow( ev ){
		clearTimeout(this.resizeTimer);
		const width = ev ? ev.target.innerWidth : window.innerWidth;
		const height = ev ? ev.target.innerHeight : window.innerHeight;
		const isTransition = false;
		const app = talknAPI.store.getState().app.merge({width, height});

		this.resizeTimer = false;
		this.resizing = false;
		talknAPI.onResizeEndWindow( app );

		app.isTransition = false;
		talknAPI.offTransition( app );
		setTimeout( () => {
			app.isTransition = true;
			talknAPI.onTransition( app )
		}, ContainerStyle.getTransitionOn( app, true ) * 2 );
	}

	appendRoot(){
		const { appName, talknIndex } = this.state;
		const container = document.createElement( 'talkn' );
		container.id = this.id;
		document.body.appendChild( container );
		return true;
	}

	addBackgroundListener(){
		const { type, talknIndex } = this.state.app;

		let promiseCondition = () => {};
		switch( type ){
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
