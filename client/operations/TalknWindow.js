import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import timeago from 'timeago.js';
import define from 'common/define';
import App from 'common/schemas/state/App';
import State from 'common/schemas/state';
import BootOption from 'common/schemas/state/BootOption';
import conf from 'client/conf'
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import configureStore from 'client/store/configureStore'
import Container from 'client/Container';

export default class TalknWindow {

	static get resizeInterval(){ return Math.floor(1000 / 60 * 10) };

	static getAppType(e){
		return window.name === define.APP_TYPES.EXTENSION ?
			define.APP_TYPES.EXTENSION : define.APP_TYPES.PORTAL;
	}

	static getScriptName(appType){
		const { PORTS, APP_TYPES } = define;
		let scriptName = 'talkn.client.js';
		if( appType !== APP_TYPES.EXTENSION ){
			scriptName = Number( location.port ) === PORTS.DEVELOPMENT ? 'talkn.client.js' : conf.clientURL;
		}
		return scriptName;
	}

	constructor( talknIndex ){
		this.id = "talkn1";
		this.talknAPI = {};
		this.resizeTimer = false;
		this.resizing = false;

		this.threadHeight = 0;
		this.innerHeight = 0;
		this.scrollHeight = 0;
		this.isAnimateScrolling = false;
		this.isScrollBottom = false;

		this.resize = this.resize.bind( this );
		this.scroll = this.scroll.bind( this );
		this.resizeStartWindow = this.resizeStartWindow.bind( this );
		this.resizeEndWindow = this.resizeEndWindow.bind( this );

		this.onLoad = this.onLoad.bind(this);
		window.onload = this.onLoad.bind(this);

		this.setupWindow( talknIndex );
		this.addWindowEventListener();
	}

	setupWindow( talknIndex ){
		if( !window.TalknAPI ) window.TalknAPI = TalknAPI;
		if( !window.__talknAPI__ ) window.__talknAPI__ = [];
		if( !window.name ) window.name = "talkn";
	}

	addWindowEventListener(){
		window.onload = this.onLoad;
		window.addEventListener('resize', this.resize );
		window.addEventListener('scroll', this.scroll );
	}

	onLoad( ev ){
		const appType = TalknWindow.getAppType(ev);
		const scriptName = TalknWindow.getScriptName(appType);
		const script = document.querySelector(`script#talkn`);
		this.threadHeight = document.querySelector("html").scrollHeight;
		this.scrollHeight = window.scrollY;
		this.innerHeight = window.innerHeight;
		this.boot( appType, window.talknIndex, script.attributes );
		window.talknAPI = window.__talknAPI__[ window.talknIndex ];
	}

	resize( ev ){
		let app = talknAPI.store.getState().app;
		if( app.type !== define.APP_TYPES.EXTENSION ){
			if ( !this.resizing ) this.resizeStartWindow();
			if ( this.resizeTimer !== false ) clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout( this.resizeEndWindow, TalknWindow.resizeInterval );
		}
	}

	scroll( ev ){
		const { app } = talknAPI.store.getState();
		const htmlScrollHeight = document.querySelector("html").scrollHeight;

		if( app.isOpenNotifInThread ){

			talknAPI.closeNotifInThread();
		}
		
		this.innerHeight = window.innerHeight;
		this.scrollHeight = window.scrollY ;
		this.isScrollBottom = ( htmlScrollHeight === ( this.innerHeight + this.scrollHeight ) );
		//this.props.scrollThread();
	}

	getIsScrollBottom(){
		const { scrollY } = window;
		( scrollHeight === ( scrollTop + clientHeight ) )
	}

	resizeStartWindow(){
		this.resizing = true;
		let app = talknAPI.store.getState().app;

		if( app.type !== define.APP_TYPES.EXTENSION ){
			const width = window.innerWidth;
			const height = window.innerHeight;
			const onTransition = false;
			const screenMode = App.getScreenMode();
			app = talknAPI.store.getState().app.merge({width, height, screenMode, onTransition});
			const setting = talknAPI.store.getState().setting;

			//talknAPI.offTransition();
			talknAPI.onResizeStartWindow( {app, setting} );
		}
	}

	resizeEndWindow( ev ){
		let app = talknAPI.store.getState().app;
		if( app.type !== define.APP_TYPES.EXTENSION ){
			clearTimeout(this.resizeTimer);
			const width = ev ? ev.target.innerWidth : window.innerWidth;
			const height = ev ? ev.target.innerHeight : window.innerHeight;
			const onTransition = true;
			const screenMode = App.getScreenMode();
			const app = talknAPI.store.getState().app.merge({width, height, onTransition, screenMode});
			const setting = talknAPI.store.getState().setting;
			const bootOption = talknAPI.store.getState().bootOption;

			this.resizeTimer = false;
			this.resizing = false;
			talknAPI.onResizeEndWindow( {app, setting, bootOption} );
		}
	}

	boot(appType, talknIndex, attributes){
		const store = configureStore();
		const bootOption = BootOption.rebuildAttributes(attributes);
		const caches = TalknSession.getCaches(bootOption.connection);
		const state = new State( appType, talknIndex, window, bootOption, caches );
		this.talknAPI = new TalknAPI( talknIndex, store, state, bootOption.connection );

		this.talknAPI.initClientState( state );
		this.render( state );
		TalknSession.listenWorker( state );
	}

	appendRoot(){
		const container = document.createElement( 'talkn' );
		container.id = this.id;
		document.body.appendChild( container );
		return true;
	}

	addBackgroundListener( state ){
		const { type, talknIndex } = state.app;
		let promiseCondition = () => {};
		promiseCondition = ( resolve, reject ) => {
			resolve( { setting: JSON.parse( localStorage.getItem( conf.cacheKey.setting + talknIndex ) ), self: self } );
		}
		return new Promise( promiseCondition );
	}


	async render( state ){
//		this.resizeEndWindow();
		await this.addBackgroundListener( state );
		await this.renderDOM();
	}

	async renderDOM(){
		ReactDOM.render(
			<Provider store={ this.talknAPI.store }>
				<Container talknAPI={ this.talknAPI } timeago={new timeago()} />
			</Provider>,
			document.getElementById( this.id ),
			() => {  }
		)
		return true;
	}
}
