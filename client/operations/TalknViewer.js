import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import timeago from 'timeago.js';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Container from 'client/Container';
import conf from 'client/conf'

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

	static getAppType(e){
		return window.name === define.APP_TYPES.EXTENSION ?
			define.APP_TYPES.EXTENSION : define.APP_TYPES.PORTAL;
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
		let app = talknAPI.store.getState().app;
		if( app.type !== define.APP_TYPES.EXTENSION ){
			if ( !this.resizing ) this.resizeStartWindow();
			if ( this.resizeTimer !== false ) clearTimeout(this.resizeTimer);
			this.resizeTimer = setTimeout( this.resizeEndWindow, TalknViewer.resizeInterval );
		}
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
	/*
			setTimeout( () => {
				talknAPI.onTransition();
			}, ContainerStyle.getTransition( app, true ) * 1.2 );
	*/
		}
	}

	appendRoot(){
		const container = document.createElement( 'talkn' );
		container.id = this.id;
		document.body.appendChild( container );
		return true;
	}

	addBackgroundListener(){
		const { type, talknIndex } = this.state.app;
		let promiseCondition = () => {};
		promiseCondition = ( resolve, reject ) => {
			resolve( { setting: JSON.parse( localStorage.getItem( conf.cacheKey.setting + talknIndex ) ), self: self } );
		}
		return new Promise( promiseCondition );
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
