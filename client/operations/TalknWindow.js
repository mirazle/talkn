import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import timeago from 'timeago.js';
import define from 'common/define';
import Schema from 'common/schemas/Schema';
import App from 'common/schemas/state/App';
import State from 'common/schemas/state';
import BootOption from 'common/schemas/state/BootOption';
import conf from 'client/conf';
import actionWrap from 'client/container/util/actionWrap';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknMedia from 'client/operations/TalknMedia';
import configureStore from 'client/store/configureStore'
import Container from 'client/container/';
import storage from 'client/mapToStateToProps/storage';

export default class TalknWindow {

	static get resizeInterval(){ return 300 };
	static getAppType(){
		return window.name === define.APP_TYPES.EXTENSION ?
			define.APP_TYPES.EXTENSION : define.APP_TYPES.PORTAL;
	}
	static getInitialApp( bootOption ){
		let initialApp = {}
		if( bootOption.extensionMode ){
			
			switch( bootOption.extensionMode ){
			case App.extensionModeExtIncludeLabel:
				initialApp.width = bootOption.extensionWidth;
				initialApp.height = bootOption.extensionOpenHeight;
				break;
			case App.extensionModeExtModalLabel:
				const connection = bootOption.href.replace('https:/', '').replace("http:/", "");
				initialApp.hasslash = connection.lastIndexOf("/") === ( connection.length - 1 );
				break;
			}
		}
		return initialApp;
	}
	static getHasSlach( bootOption ){
		if( bootOption.href ){
			const connection = bootOption.href.replace('https:/', '').replace("http:/", "");
			return connection.lastIndexOf("/") === ( connection.length - 1 );
		}else{
			return bootOption.hasslash ? Schema.getBool( bootOption.hasslash ) : false;
		}
	}
	static getPostsClientHeight(){
		const postsClient = document.querySelector("[data-component-name=Posts]");
		return postsClient ? postsClient.clientHeight : 0;
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
	
	static sleep(waitMsec) {
		const startMsec = new Date();
		while (new Date() - startMsec < waitMsec);
	}

	constructor( talknIndex ){
		this.id = "talkn1";
		this.talknIndex = talknIndex;
		this.appType = TalknWindow.getAppType();
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
		this.isScrollBottom = true;

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

		this.listenAsyncBoot();
	}

	setupWindow( talknIndex = 0 ){
		const html = document.querySelector("html");
		html.style.cssText += "" + 
			"width 100% !important;" +
			"height: 100% !important;" + 
			"margin: 0px auto !important;" +
			"padding-top: 0px !important;";

		const body = document.querySelector("body");
		body.style.cssText += "" + 
			"width 100% !important;" +
			"height: 100% !important;" + 
			"margin: 0px auto !important;" +
			"visibility: visible !important;" +
			"opacity: 1 !important;";

		if( !window.TalknAPI ) window.TalknAPI = TalknAPI;
		if( !window.__talknAPI__ ) window.__talknAPI__ = [];
		window.talknAPI = window.__talknAPI__[ window.talknIndex ];
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
			window.addEventListener('message',  ( ev ) => {
				if(ev.origin === "https://www.youtube.com"){
					console.log(ev);
				}
			});

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
			let bootOption = bootParams[1] ? {...scriptOption, ...bootParams[1]} : scriptOption;
			bootOption.hasslash = TalknWindow.getHasSlach(bootOption);
			this.boot( bootOption );
		});
	}

	boot( bootOption ){
		const connection = bootOption.connection;
		const initialApp = TalknWindow.getInitialApp( bootOption );
		const store = configureStore();
		const caches = TalknSession.getCaches(connection);
		const state = new State( this.talknIndex, window, bootOption, initialApp, caches );
		this.talknAPI = new TalknAPI( this.talknIndex, store, state, connection );
		this.talknAPI.initClientState( state );

		ReactDOM.render(
			<Provider store={ this.talknAPI.store }>
				<Container talknAPI={ this.talknAPI } timeago={new timeago()} />
			</Provider>,
			document.getElementById( this.id ),
			() => { 
			}
		)
		return true;
	}

	message(e, resolve){
		if( e.data.type === "talkn" ){
			switch( e.data.method ){
			case "bootExtension" :
				this.parentUrl = e.data.href;
				this.parentTo( "bootExtension", conf );
				resolve(e.data.params);
				break;
			case "startLinkMedia" :
				if( e.data.params.connection && e.data.params.playCnt === 0 ){
					actionWrap.onClickConnection( e.data.params.connection, false, e.data.method );
					TalknMedia.init();
					const connection = e.data.params.connection;
					const timeline = storage.getStoragePostsTimeline( connection );
					window.talknMedia = new TalknMedia();
					window.talknMedia.setTimeline( timeline );
					talknAPI[ e.data.method ]( e.data.params );
				}
				break;
			case "playMedia" :
				if( window.talknMedia && window.talknMedia.proccess &&　window.talknMedia.timeline.length > 0 ){
					console.log("@@@@@@@@@@@@@@@");
					console.log("PROCCESS");
					console.log("@@@@@@@@@@@@@@@");
					window.talknMedia.proccess( e.data.params.currentTime );
				}else{
					TalknMedia.init();
					const connection = e.data.params.thread.connection;
					const timeline = storage.getStoragePostsTimeline( connection );
					window.talknMedia = new TalknMedia();
					window.talknMedia.setTimeline( timeline );
				}
				break;
			case "endMedia" :
				if( e.data.params.playCnt > 0 ){
					window.talknMedia.endedFunc();
				}
				break;
			default: 
				if(	
					typeof window.talknAPI !== "undefined" && 
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
		this.setupWindow();
		resolve(true);
	}

	ready(ev){

	}

	resize( ev ){
		if( window.talknAPI ){
			const app = window.talknAPI.store.getState().app;
			if(
				app.extensionMode === "EXT_BOTTOM" ||
				app.extensionMode === "EXT_MODAL"
			){
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
	}

	scroll( ev ){
		const { app } = talknAPI.store.getState();
		if( app.isOpenNewPost ){
			talknAPI.closeNewPost();
		}
		this.setIsScrollBottom( app );
	}

	setIsScrollBottom( app, isScrollBottom = true ){
		if( app.extensionMode === App.extensionModeExtNoneLabel ){
			// ここがスマホブラウザだと正しく取得されていない模様
			const htmlScrollHeight = document.querySelector("html").scrollHeight;
			this.innerHeight = window.innerHeight;
			this.scrollHeight = window.scrollY ;
			const bodyScrollHeight = document.querySelector("body").scrollTop;
			this.isScrollBottom = ( htmlScrollHeight === ( this.innerHeight + this.scrollHeight ) );	
		}else{
			this.isScrollBottom = isScrollBottom;
		}
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

	parentTo( method, params ){
		if(this.parentUrl){
			window.top.postMessage({
				type: 'talkn',
				method, params
			}, this.parentUrl );
		}
	}
}
