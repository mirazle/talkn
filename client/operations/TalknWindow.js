import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import timeago from 'timeago.js';
import define from 'common/define';
import conf from 'client/conf';
import App from 'common/schemas/state/App';
import State from 'common/schemas/state';
import BootOption from 'common/schemas/state/BootOption';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
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
		if( bootOption.extensionMode && bootOption.extensionMode === "EXT_INCLUDE"){
			return {
				width: bootOption.extensionWidth,
				height: bootOption.extensionOpenHeight
			};
		}else{
			return initialApp;
		}
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
		this.mediaTasking = false;
		this.mediaCurrentTime = 0;

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
		this.setupPostsTimeline = this.setupPostsTimeline.bind( this );

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
						console.log(ev);
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
				this.parentUrl = e.data.url;
				this.parentTo( "bootExtension", conf );
				resolve(e.data.params);
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

	getMediaCurrentTime( mediaCurrentTime, base = 10 ){
		return Math.floor( mediaCurrentTime * base ) / base;
	}

	setupPostsTimeline(rootConnection, src, tagType = "audio"){
		const postsTimelineZero = storage.getStoragePostsTimelineZero( rootConnection );
		const postsTimelineBase = storage.getStoragePostsTimeline( rootConnection );
		let loopPostsTimeline = [ ...postsTimelineBase ];
		let loopPostsTimelineLength = loopPostsTimeline.length;
		const media = document.querySelector(`${tagType}[src='${src}']`)

		if( media === null ) return false;

		media.addEventListener( "ended", () => {
			this.mediaCurrentTime = this.getMediaCurrentTime( media.currentTime );
			const length = loopPostsTimeline.length;
			for( let i = 0; i < length; i++ ){
				if( loopPostsTimeline[ i ] && loopPostsTimeline[ i ].currentTime <= this.mediaCurrentTime ){
					this.talknAPI.nextPostsTimeline([ loopPostsTimeline[ i ] ]);
				}else{
					break;
				}
			}
		} );
		const log = true;
		setInterval( () => {
			if( media && media.paused ){
				if( log ) console.log("Media Pause");
				return false;
			}

			if( this.mediaTasking ){
				if( log ) console.log("Tasking");
				return false;
			}

			// Get current time.
			const mediaCurrentTime = this.getMediaCurrentTime( media.currentTime );
			this.mediaTasking = true

			// Timeline is next.
			if(
				this.mediaCurrentTime === mediaCurrentTime ||
				this.mediaCurrentTime < mediaCurrentTime
			){
				this.mediaCurrentTime = mediaCurrentTime;

				if( log ) console.log("START WHILE " + this.mediaCurrentTime );
				if( log && loopPostsTimeline && loopPostsTimeline[0] && loopPostsTimelineLength > 0 ) console.log( loopPostsTimeline[ 0 ].currentTime );

				while( this.mediaTasking ){
					if( loopPostsTimelineLength === 0 ){
						this.mediaCurrentTime = addPost.currentTime;
						this.mediaTasking = false;
					}else if( loopPostsTimeline[ 0 ] && loopPostsTimeline[ 0 ].currentTime <= mediaCurrentTime ){
						const addPost = loopPostsTimeline.shift();
						this.mediaCurrentTime = addPost.currentTime;
						if(log) console.log( addPost.post );
						this.talknAPI.nextPostsTimeline([ addPost ]);
					}else{
						this.mediaTasking = false;
						break;
					}
				}

			// Timeline is prev.
			}else{
				if( this.mediaTasking  ){

					const { postsTimeline } = window.talknAPI.store.getState();

					this.mediaCurrentTime = mediaCurrentTime;

					// 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
					this.talknAPI.clearPostsTimeline(mediaCurrentTime);

					if(log) console.log( "BACK " + mediaCurrentTime );
					if(log) console.log( postsTimeline );


					// これから表示するpost一覧を保持
					//loopPostsTimeline = postsTimelineBase.filter( (pt) => pt.currentTime > mediaCurrentTime);

					loopPostsTimeline= postsTimeline.concat( postsTimelineBase ).filter( (pt, index, self) => {
						if(self.indexOf(pt) === index){
							if( pt.currentTime > mediaCurrentTime ){
								return true;
							}
						}
						return false;
					});

					
					if(log) console.log( loopPostsTimeline );
					this.mediaTasking = false;
				}
			}
		}, conf.mediaSecondInterval );
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
