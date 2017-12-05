import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initAction } from '../actions/styles'
import * as stylesAction from '../actions/styles'
import * as wsAction from '../actions/ws'
import func from '../util/func'
import define from '../util/define'
import styles from '../components/styles'
import Root from '../components/root'
import configureStore from '../store/configureStore'

const appType =  func.getAppType();

class Talkn {

	constructor( appType, talknIndex, ws, define, Provider, configureStore, stylesAction, wsAction, styles, ReactDOM, Root ){

		this.appType = appType;
		this.appName = "talkn";
		this.ws = ws;
		this.talknIndex = talknIndex;
		this.define = define;
		this.Provider = Provider;
		this.configureStore = configureStore;
		this.stylesAction = stylesAction;
		this.wsAction = wsAction;
		this.styles = styles;
		this.ReactDOM = ReactDOM;
		this.Root = Root;
		this.talknTag;
	}

	appendReactRoot(){
		this.talknTag = document.createElement( this.appName );
		this.talknTag.id = this.appName + this.talknIndex;
		Object.assign( this.talknTag.style, this.styles.talkn.talkn );
		document.body.appendChild( this.talknTag )
	}

	render( option = {}, focusMeta = {} ){

		/************************/
		/* OPTION		*/
		/************************/

		let promiseThen = ( setting ) => { return setting }

		option.talknIndex = this.talknIndex;
		option.connection = ( typeof option.connection == null )? this.define.style.defaultTalknConnection : option.connection;
		option.width = ( option.width == null )? this.define.style.defaultTalknWidth : option.width;
		option.height = ( option.height == null )? this.define.style.defaultTalknHeight : option.height;
		option.render = ( option.render == null )? this.define.style.defaultTalknRender : option.render;
		option.isOpen = ( option.isOpen == null )? this.define.style.defaultTalknIsOpen : option.isOpen;
		option.isMove = ( option.isMove == null )? this.define.style.defaultTalknIsMove : option.isMove;
		option.thum = func.getDefaultFavicon();
		option.mode = ( option.mode == null )? func.getMode( option.width ) : option.mode ;
		option.widthUnit = ( option.width.indexOf( "px" ) >= 0 )? "px" : "%";
		option.heightUnit = ( option.height.indexOf( "px" ) >= 0 )? "px" : "%";

		let settingCallback = function( result ){

			let self = result.self;

			option.setting = result.setting;

			/************************/
			/* API			*/
			/************************/

			if( typeof( window.__talknAPI__ ) === "undefined" ) window.__talknAPI__ = [];
			let talknAPI = new Object();
			talknAPI.talknIndex = self.talknIndex
			talknAPI.handleAPI = ( num )=>{
				if( typeof __talknAPI__[ num ] !== "undefined" ){
					window.talknAPI = window.__talknAPI__[ num ];
					return true;
				}
				return false;
			};

			talknAPI.store = self.configureStore();
			let styleActionKeys = Object.keys( self.stylesAction );
			let styleActionLength = styleActionKeys.length;
			let wsActionKeys = Object.keys( self.wsAction );
			let wsActionLength = wsActionKeys.length;

			talknAPI[ 'setTalknIndex' ] = ( talknIndex )=>{

				// Execute Action Method .
				let returnValues = self.stylesAction[ "setTalknIndex" ]( talknIndex );

				// Dispatch to Reducer .
				return talknAPI.store.dispatch( returnValues );
			}

			// Style Action Method Loop .
			for( let actionNodeCnt = 0; actionNodeCnt < styleActionLength; actionNodeCnt++ ){

				let methodName = styleActionKeys[ actionNodeCnt ];

				if( methodName !== "setTalknIndex" ){

					if( typeof self.stylesAction[ methodName ] === 'function' ){

						talknAPI[ methodName ] = self.getStyleAPI( self.talknIndex, methodName );
					}
				}
			}

			// Ws Action Method Loop .
			for( let actionNodeCnt = 0; actionNodeCnt < wsActionLength; actionNodeCnt++ ){

				let methodName = wsActionKeys[ actionNodeCnt ];
					if( typeof self.wsAction[ methodName ] === 'function' ){
						talknAPI[ methodName ] = self.getWsAPI( self.talknIndex, methodName );
					}
			}

			window.__talknAPI__[ self.talknIndex ] = talknAPI;
			window.talknAPI = talknAPI;

			/************************/
			/* DISPATCH		*/
			/************************/

			talknAPI.store.dispatch( self.stylesAction.initAction( {
								talknIndex: self.talknIndex,
								styles: self.getClosureBaseStyles(
													self.talknIndex,
													self.styles,
													option,
													focusMeta,
													define
								)()
							}
			) );

			/************************/
			/* CONNECT		*/
			/************************/

			talknAPI.connect( { talknIndex: self.talknIndex, ws: self.ws } );

			/************************/
			/* RENDER		*/
			/************************/

			console.log("###########");
			console.log(self);
			console.log("###########");
			self.ReactDOM.render(
				<self.Provider store={ talknAPI.store }>
					<self.Root talkn={ self } talknIndex={ self.talknIndex } />
				</self.Provider>,
				document.getElementById( self.talknTag.id )
			)

			self.talknTag.setAttribute( "data-connection", self.styles.root.option.connection );

		}

		// Sync Set Setting .
		func.addBackgroundListener( option, focusMeta, this, settingCallback ).then( settingCallback );
	}

	getClosureBaseStyles( talknIndex, styles, option, focusMeta, define ){
		return ()=>{

			styles.root.option = option
			styles.root.focusMeta = focusMeta;

			/************************/
			/* POSITION		*/
			/************************/

			if( option.width === "100%" || option.width === "100vw" ){

				option.width = "100%";
				//styles.main.main.borderRadius = "0";
				styles.container.container.right = "0px";
				styles.container.container.left = "auto";
				styles.container.container.bottom = "0px";
				styles.container.container.padding = "6px 0px 0px 0px";

			}else{

				if( option.render === "left" ){
					styles.container.container.right = "auto";
					styles.container.container.left = "5px";
				}else{
					styles.container.container.right = "5px";
					styles.container.container.left = "auto";
				}
			}

			styles.container.container.width = option.width;
			styles.container.container.maxHeight = option.height;
			styles.container.container.height = ( option.isOpen !== true )? define.style.displayAreaHeight : styles.container.container.maxHeight ;

			if( option.setting ) styles.root.setting = option.setting ;

			let unit = styles.root.option.widthUnit;
			let mode = styles.root.option.mode;
			styles.slide.slide = $.extend( true, styles.slide.slide, styles.slide.mode[ unit ][ mode ] );
			styles.index.index = $.extend( true, styles.index.index, styles.index.mode[ unit ][ mode ] );
			styles.thread.thread = $.extend( true, styles.thread.thread, styles.thread.mode[ unit ][ mode ] );
			styles.detail.detail = $.extend( true, styles.detail.detail, styles.detail.mode[ unit ][ mode ] );

			return styles;
		}
	}

	getStyleAPI( talknIndex, methodName ){

		return ( talknIndex = talknAPI.talknIndex, params )=>{

			if( typeof( talknIndex ) === "object" ){
				params = talknIndex;
				talknIndex = talknAPI.talknIndex;
			}

			// Handle API Method .
			if( talknAPI.handleAPI( talknIndex ) ){

				if( define.throwSetTalknIndex.indexOf( methodName ) === -1 ){

					// Common Execute Method .
					talknAPI[ "setTalknIndex" ]( talknIndex );
				}

				// Execute Action Method .
				let returnValues = this.stylesAction[ methodName ]( talknIndex, params );

				// Dispatch to Reducer .
				return talknAPI.store.dispatch( returnValues );
			}
		}
	}

	getWsAPI( talknIndex, methodName ){

		return ( state ) => {

			let dispatchFinnishFlg = false;
			let apiCnt = __talknAPI__.length;
			let dispatchFunc = ( self, methodName, state )=>{
console.log("============ " + methodName );
				if( state.get('talknIndex') === undefined ) state.set('talknIndex', talknAPI.talknIndex );
				if( state.get('connection') === undefined && talknAPI.store.getState().styles[ talknIndex ] ){
					state.set('connection', talknAPI.store.getState().styles[ talknIndex ].root.focusMeta.connection);
				}

				if( state.get('connection') ){

					state.set('connection', params.connection.replace( /\n|\t/g, '' ));

					// Handle API Method .
					if( talknAPI.handleAPI( params.talknIndex ) ){

						// Detail Area Any Exe API .
						if( methodName === "find" || methodName === "changeThread" ){

							if( params.exeApiFlg && params.exeApiFlg ){

								let apiMenuExeKey = talknAPI.store.getState().styles[ state.get('talknIndex') ].detail.apiMenuExeKey
								apiMenuExeKey = func.toUpperFirstStr( apiMenuExeKey );
								talknAPI[ "getApi" + apiMenuExeKey ]( state );
							}
						}

						// Execute Action Method .
						let returnValues = self.wsAction[ methodName ]( state );

						// Dispatch to Reducer .
						return talknAPI.store.dispatch( returnValues );
					}
				}
			}

console.log("#### " + methodName);

			switch( methodName ){
			case "connect":
				return true;
				break;
			case "find":
				let connectionIndexs = __talknAPI__[ talknIndex ].store.getState().ws.index[ talknIndex ];
				let connectionIndexLength = connectionIndexs.length;

				for( let conIdx = 0; conIdx < connectionIndexLength; conIdx++ ){

					let userConnection = connectionIndexs[ conIdx ].connection;

					// Block Re Find .
					if( !params.offsetPostTime && userConnection === params.connection ){

						dispatchFinnishFlg = true;
						break;
					}
				}

				break;
			case "catchResponse":
				dispatchFinnishFlg = true;
				let dispatchTalknIndex = [];

				switch( params.called ){
				case "connectioned":
				case "find":
				case "changeThread":
				case "getApiMeta":
				case "getApiSocial":
				case "getApiMovie":
				case "getApiPicture":
				case "getApiWikipedia":
				case "getApiAnalyze":
				case "updateWatchCnt":

					dispatchFunc( this, methodName, state );
					break;
				default:
					for( let talknIndex = 0 ; talknIndex < apiCnt ; talknIndex++ ){
						if( typeof __talknAPI__[ talknIndex ] !== "undefined" ){
							let connectionIndexs = __talknAPI__[ talknIndex ].store.getState().ws.index[ talknIndex ];
							let connectionIndexLength = connectionIndexs.length;

							for( let conIdx = 0; conIdx < connectionIndexLength; conIdx++ ){
								let userConnection = connectionIndexs[ conIdx ].connection;
								if( userConnection === params.connection ){
									state.set('talknIndex', talknIndex);
									dispatchFunc( this, methodName, state );
								}
							}
						}
					}
					break;
				}

				break;
			case "post":

				for( let talknIndex = 0 ; talknIndex < apiCnt ; talknIndex++ ){
					if( typeof __talknAPI__[ talknIndex ] !== "undefined" ){
						if( __talknAPI__[ talknIndex ].store.getState().styles[ talknIndex ].root.focusMeta.connection === state.get('connection') ){
							state.set('talknIndex', talknIndex);
							break;
						}
					}
				}
				break;
			case "changeThread":

				break;
			}

			if( dispatchFinnishFlg === false ){
				dispatchFunc( this, methodName, state );
				dispatchFinnishFlg = true;
			}
		}
	}

	static isTalknScript( headNode ){
		if( typeof( headNode ) !== "undefined" ){
			if( headNode.tagName === "SCRIPT" ){
				if( typeof headNode.getAttribute( "src" ) === "string" ){
					if( headNode.getAttribute( "src" ).indexOf( "talkn.client.js" ) !== -1 ){
						return true;
					}
				}
			}
		}
		return false;
	}

	static dispatchMode(){
		let apiCnt = __talknAPI__.length;

		for( let talknIndex = 0 ; talknIndex < apiCnt ; talknIndex++ ){

			if( typeof __talknAPI__[ talknIndex ] !== "undefined" ){

				if( __talknAPI__[ talknIndex ].store.getState().styles[ talknIndex ].root.option.widthUnit === "%" ){
					let containerWidth = __talknAPI__[ talknIndex ].store.getState().styles[ talknIndex ].container.container.width;
					let mode = func.getMode( containerWidth );
					talknAPI.changeMode( talknIndex, mode );
				}
			}
		}
	}
}

window.onload =  function(){

	let port = ( location.protocol === "https:" )? define.server.httpsPort : define.server.httpPort ;
	let protcol = func.getProtcol();
	let url = protcol + "//" + define.server.host + ':' + port  + define.server.endPoint;

	$.ajax({
		type: "GET",
		url: url,
		beforeSend: function(){},
		dataType: "script",
		success: function(){
		},
		error: function( ev, data ){
		}
	}).then(( response ) => {
		const ws = io( protcol + "//" + define.server.host + ':' + port, define.server.option );
		ws.connectionMap = {};
		const headLength = $( "head" )[ 0 ].childNodes.length;
		const connectionList = [];
		let existScriptTagFlg = false;

		switch( appType ){
		case "plugin" :

			existScriptTagFlg = true;
			let option = {};
			option.talknIndex = 0;
			option.appType = appType;
			option.mode = "screen1";
			option.connection = func.getUrlConnection();
			option.title = func.getTitle();

			let focusMeta = func.getMetaProps( option.talknIndex, option.connection );

			let talkn = new Talkn( appType, 0, ws, define, Provider, configureStore, stylesAction, wsAction, styles, ReactDOM, Root );
			talkn.appendReactRoot();
			talkn.render( option, focusMeta );
			break;
		case "electron":
		case "script":

			if( existScriptTagFlg || headLength > 0 ){
				let talknIndex = 1;
				let keywords = func.getKeywords();
				let desc = func.getDesc();
				let focusMeta = func.getMetaProps( talknIndex );

				for( let headIndex = 0; headIndex < headLength; headIndex++ ){

					let headNode = $( "head" )[ 0 ].childNodes[ headIndex ] ;
					if( Talkn.isTalknScript( headNode ) ){
						let talkn = new Talkn( appType, talknIndex, ws, define, Provider, configureStore, stylesAction, wsAction, styles, ReactDOM, Root );

						let option = {};
						option.appType = appType;
						option.connection = headNode.getAttribute( "connection" );
						option.title = headNode.getAttribute( "connection" );
						option.width = headNode.getAttribute( "width" );
						option.height = headNode.getAttribute( "height" );
						option.render = headNode.getAttribute( "render" );
						option.isOpen = headNode.getAttribute( "isOpen" );
						option.isMove = headNode.getAttribute( "isMove" );

						if( option.connection === null ){
							if( location.host === "" ){
								option.connection = define.style.defaultTalknConnection;
							}else{
								let url = "/" + location.href.split( "//" )[ 1 ] ;
								let urlLen = url.length - 1
								let urlLastStr = url[ urlLen ];
								option.connection = ( urlLastStr === "/" )? url.substr( 0, urlLen ) : url;
							}
						}else{
							option.connection = ( option.connection[ 0 ] === "/" )? option.connection : "/" + option.connection ;
						}

						focusMeta = Object.assign( {}, focusMeta, {talknIndex: talknIndex , connection: option.connection } );

						talkn.appendReactRoot();
						talkn.render( option, focusMeta );
						talknIndex++;
					}
				}
			}
			break;
		}

		let timer = false;
		$( window ).resize( ()=>{

			if (timer !== false) {
				clearTimeout(timer);
			}

			timer = setTimeout( Talkn.dispatchMode, 200 );
		}).keydown( ( e )=>{

			let talknIndex = e.target.getAttribute("data-talknIndex");

			if( talknIndex !== null ){

				talknAPI.handleAPI( talknIndex );
				let state = talknAPI.store.getState();
				let focusTextarea = state.styles[ talknIndex ].root.focusTextarea;

				switch( focusTextarea ){
				case "searchIndex":
					if( e.keyCode === 13 ){
						let exeFindFlg = true;
						let $textArea = $( "#talkn" + talknIndex + " textarea.searchIndex" );
						let connection = "/" + $textArea.val();
						connection = connection.replace( /\n|\t/g, '' );

						let index = state.ws.index[ talknIndex ];
						let indexLength = index.length;
						for( let i = 0; i < indexLength; i++ ){
							if( Object.keys( index[ i ] )[ 0 ] === connection ){
								exeFindFlg = false;
							}
						}

						if( exeFindFlg ){
							talknAPI.find( {
									talknIndex: talknAPI.talknIndex,
									dispThreadFlg: true,
									connection: connection
									} );
							$textArea.val("");
							setTimeout( function(){
								$textArea.val("");
							}, 100 );
						}
					}
					break;
				case "post":

					if( e.shiftKey ){
						if( e.keyCode === 13 ){
							return false;
						}
					}else if( e.keyCode === 13 ){

						let root = talknAPI.store.getState().styles[ talknIndex ].root;
						let index = talknAPI.store.getState().ws.index[ talknIndex ];
						let $textArea = $( "#talkn" + talknIndex + " textarea.post" );
						let talk = $textArea.val();
						let protcol = func.getProtcol();

						if( talk !== "" ){
							let req = Object.assign( {}, {
								talknIndex: talknIndex,
								talk: talk,
								protcol: protcol,
								indexId: root.focusIndexId
							}, root.focusMeta );
							talknAPI.post( req );
							$textArea.val("");
						}
						return false;
					}
					break;
				}
			}
		});
	});
};
