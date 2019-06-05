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
import Container from 'client/container/';

export default class TalknWindow {

	static get resizeInterval(){ return 300 };
	static getAppType(){
		return window.name === define.APP_TYPES.EXTENSION ?
			define.APP_TYPES.EXTENSION : define.APP_TYPES.PORTAL;
	}
	static getPostsHeight(){
		let postsHeight = 0;
		document.querySelectorAll("[data-component-name=Post]").forEach( (post) => {
			postsHeight += post.clientHeight;
		} );
		return postsHeight;
	}

	static getLastPostHeight(){
		const posts = document.querySelector("[data-component-name=Posts]");
		if( posts && posts.lastChild && posts.lastChild.clientHeight ){
			return posts.lastChild.clientHeight;
		}
		return 0;
	}

	constructor( talknIndex ){
		this.id = "talkn1";
		this.talknIndex = talknIndex;
		this.appType = TalknWindow.getAppType();;
		this.talknAPI = {};
		this.resizeTimer = null;
		this.parentUrl = null;
		this.threadHeight = 0;
		this.innerHeight = 0;
		this.scrollHeight = 0;
		
		this.isLoaded = false;
		this.isMessageed = false;
		this.isExistParentWindow = false;
		this.isAnimateScrolling = false;
		this.isScrollBottom = false;

		this.load = this.load.bind(this);
		this.resize = this.resize.bind( this );
		this.scroll = this.scroll.bind( this );
		this.message = this.message.bind( this );
		this.parentTo = this.parentTo.bind( this );

		this.resizeStartWindow = this.resizeStartWindow.bind( this );
		this.resizeEndWindow = this.resizeEndWindow.bind( this );
		this.setIsScrollBottom = this.setIsScrollBottom.bind( this );


		this.dom = {};
		this.dom.html = document.querySelector("html");
		this.dom.body = document.querySelector("body");
		this.dom.talkn1 = document.querySelector("#talkn1");

		this.setupWindow( talknIndex );
		this.listenAsyncBoot();
	}

	setupWindow( talknIndex ){
		if( !window.TalknAPI ) window.TalknAPI = TalknAPI;
		if( !window.__talknAPI__ ) window.__talknAPI__ = [];
		//if( !window.name ) window.name = "talkn";
	}

	listenAsyncBoot(){
		const bootPromises = [];
		bootPromises.push(
			new Promise( ( resolve ) => {
				window.addEventListener('load',  ( ev ) => {
					this.load(ev, resolve);
				});
			})
		);

		switch( this.appType ){
		case define.APP_TYPES.PORTAL :	
			window.addEventListener('resize', this.resize );
			window.addEventListener('scroll', this.scroll );
			break;
		case define.APP_TYPES.EXTENSION:
			bootPromises.push(
				new Promise( ( resolve ) => {
					window.addEventListener('message',  ( ev ) => {
						this.message( ev, resolve );
					});
				})
			);
			window.addEventListener('resize', this.resize );
			window.addEventListener('scroll', this.scroll );
			break;
		}

		Promise.all( bootPromises ).then( ( bootParams ) => {
			const script = document.querySelector(`script#talkn`);
			const scriptOption = BootOption.rebuildAttributes(script.attributes);
			const bootOption = bootParams[1] ? {...scriptOption, ...bootParams[1]} : scriptOption;
			this.boot( bootOption );
		});
	}

	boot( bootOption ){
		const connection = bootOption.connection;
		const store = configureStore();
		const caches = TalknSession.getCaches(connection);
		const state = new State( this.talknIndex, window, bootOption, caches );
		this.talknAPI = new TalknAPI( this.talknIndex, store, state, connection );
		this.talknAPI.initClientState( state );
		this.render( state );
	}

	message(e, resolve){
		if( e.data.type === "talkn" ){
			switch( e.data.method ){
			case "bootExtension" :
				this.parentUrl = e.data.url;
				this.parentTo( "bootExtension" );
				resolve(e.data.params);
				break;
			default: 
				if(	
					talknAPI[ e.data.method ] &&
					typeof talknAPI[ e.data.method ] === "function"
				){
					talknAPI[ e.data.method ]( e.data.params );
				}
				break;
			}
		}
	}

	load( ev, resolve ){
		this.threadHeight = document.querySelector("html").scrollHeight;
		this.scrollHeight = window.scrollY;
		this.innerHeight = window.innerHeight;
		window.talknAPI = window.__talknAPI__[ window.talknIndex ];
		resolve(true);
	}

	resize( ev ){
		const app = talknAPI.store.getState().app;
		if(
			app.extensionMode === "EXT_BOTTOM" ||
			app.extensionMode === "EXT_MODAL"
		){
			console.log("APP RESIZING");
			if( this.resizeTimer === null ){
				this.resizeTimer = setTimeout( () => {
					this.resizeEndWindow(app);
				}, TalknWindow.resizeInterval );
			}
		}else{
			if( this.resizeTimer === null ){
				//this.resizeStartWindow(app);
				this.resizeTimer = setTimeout( (app) => {
					this.resizeEndWindow(app);
				}, TalknWindow.resizeInterval );
			}
		}
	}

	scroll( ev ){
		const { app } = talknAPI.store.getState();
		if( app.isOpenNewPost ){
			talknAPI.closeNewPost();
		}
		this.setIsScrollBottom();
	}

	setIsScrollBottom(){

		// ここがスマホブラウザだと正しく取得されていない模様
		const htmlScrollHeight = document.querySelector("html").scrollHeight;
		this.innerHeight = window.innerHeight;
		this.scrollHeight = window.scrollY ;
		const bodyScrollHeight = document.querySelector("body").scrollTop;
		this.isScrollBottom = ( htmlScrollHeight === ( this.innerHeight + this.scrollHeight ) );
	}

	resizeStartWindow(app){
		app.width = window.innerWidth;
		app.height = window.innerHeight;
		app.isTransition = false;
		app.screenMode = App.getScreenMode();
		const setting = talknAPI.store.getState().setting;
		talknAPI.onResizeStartWindow({app, setting});
	}

	resizeEndWindow( app ){
		console.log("APP RESIZED!!!!!");
		clearTimeout(this.resizeTimer);
		this.resizeTimer = null;

		app = talknAPI.store.getState().app;
		app.width = window.innerWidth;
		app.height = window.innerHeight;
		//app.isTransition = true;
		app.screenMode = App.getScreenMode();

		const setting = talknAPI.store.getState().setting;
		const bootOption = talknAPI.store.getState().bootOption;
		talknAPI.onResizeEndWindow( {app, setting, bootOption} );
	}

	animateScrollTo( to = 99999, duration = 400,  callback = () => {} ){

		if( duration === 0 ){
			window.scrollTo(0, to);
		}else{

			if( !this.isAnimateScrolling ){
				let start = window.scrollY;
				let change = to - start;
				let currentTime = 0;
				let increment = 20;

				const animateScroll = ()　=>　{
					currentTime += increment;
					let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
					screenTop = Math.floor( scrollTop );
					window.scrollTo(0, scrollTop);
					if(currentTime < duration){
						this.isAnimateScrolling = true;
						setTimeout(animateScroll, increment);
					}else{
						this.isAnimateScrolling = false;
						callback();
					}
				};
				animateScroll();
			}
		}
	}

	lockWindow(){
		const overflow = "hidden";
		this.dom.html.style.overflow = overflow;
		this.dom.body.style.overflow = overflow;
		this.dom.talkn1.style.overflow = overflow;
		return window.scrollY;
	}

	unlockWindow(){
        const overflow = "inherit";
		this.dom.html.style.overflow = overflow;
		this.dom.body.style.overflow = overflow;
		this.dom.talkn1.style.overflow = overflow;
	}

	appendRoot(){
		const container = document.createElement( 'talkn' );
		container.id = this.id;
		document.body.appendChild( container );
		return true;
	}

	addBackgroundListener( state ){
	}

	loadedTalkn(e){
	}
	
	parentTo( method, params ){
		if(this.parentUrl){
			window.top.postMessage({
				type: 'talkn',
				method, params
			}, this.parentUrl );
		}
	}

	async render( state ){
		await this.renderDOM();
	}

	async renderDOM(){
		ReactDOM.render(
			<Provider store={ this.talknAPI.store }>
				<Container talknAPI={ this.talknAPI } timeago={new timeago()} />
			</Provider>,
			document.getElementById( this.id ),
			this.loadedTalkn
		)
		return true;
	}
}
