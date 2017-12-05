import $ from 'jquery';
import define from '../util/define';
import func from '../util/func';

export const EXE_KEYS = [
	"INIT_CLIENT_STATE",
				"CONNECT",
				"FIND",
				"SET_CALLBACK",
				"CATCH_RESPONSE",
				"GET_API_META",
				"GET_API_ANALYZE",
				"POST",
				"CHANGE_THREAD",
				"DELETE_INDEX"
			];

let promiseCondition = () => {}
let promiseThen = () => {}
let promiseError = ( error ) => { console.log( "ERROR" ); }
let ws = null;

export default store => next => action => {
	if( Object.keys( action ).length !== 1 ) return next( action );
	let exeKey = Object.keys( action )[ 0 ];
	if( $.inArray( exeKey, EXE_KEYS ) === -1 ) return next( action );

	let params = action[ exeKey ];
console.log("## WS MIDDLE" + exeKey);
	switch( exeKey ){
	case "INIT_CLIENT_STATE":
	
		break;
	case "CONNECT":
		promiseCondition = ( resolve, reject )=>{
			if( ws === null ){

				// Socket.io Server .
				ws = params.ws;
				ws.indexConnectionMap = {};
				ws.deleteConnection = "";
console.log("DEFAULT KEY " + define.server.defaultKey);
				// Catch Response Function .
				ws.on( define.server.defaultKey, talknAPI.catchResponse );
				ws.indexConnectionMap[ define.server.defaultKey ] = [];
			}
			return next( { type: "CONNECT", talknIndex: params.talknIndex, ws: ws } );
		};
		promiseThen = ( response )=>{ return next( response ) };
		break;
	case "SET_CALLBACK":

		promiseCondition = ( resolve, reject ) => {

			params.connection = params.connection.replace( /\n|\t/g, '' );

			if( $.inArray( params.connection, Object.keys( ws.indexConnectionMap ) ) === -1 ){
				ws.on( params.connection, talknAPI.catchResponse );
			}
			resolve( { type: "SET_CALLBACK", talknIndex: params.talknIndex, connection: params.connection } )
		}
		promiseThen = ( response )=>{ return next( response ) };
		break;
	case "FIND":
		promiseCondition = ( resolve, reject ) => {

			params.called = "find";
			params.connection = params.connection.replace( /\n|\t/g, '' );
			params.connection = ( params.connection.indexOf( "/" ) === 0 )? params.connection : "/" + params.connection ;
			params.thum = ( params.thum === undefined )? define.server.defaultThum: params.thum;
			params.title = ( params.title === undefined || params.title === "" )? params.connection : params.title;


			if( params.offsetPostTime === undefined ){
				params.called = "find";
				params.offsetPostTime = 0;
			}else{
				params.called = "getMore";
				params.offsetPostTime = params.offsetPostTime;
			}

			// If Not Connection To Server .
			if( $.inArray( params.connection, Object.keys( ws.indexConnectionMap ) ) === -1 ){

				ws.on( params.connection, talknAPI.catchResponse );
			}

			ws.deleteConnection = "";

			ws.emit( 'find', { connection: params.connection,
							protcol: func.getProtcol(),
							dispThreadFlg: params.dispThreadFlg,
							offsetPostTime: params.offsetPostTime,
							limit: 20,
							talknIndex: params.talknIndex,
							called: params.called });

			resolve( Object.assign( {}, { type: "FIND"}, params ) );

		}
		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{
			console.log( "ERROR" );
			console.log( error );
			//return next( {type: "FIND" } )
		};

		break;
	case "CHANGE_THREAD":
		promiseCondition = ( resolve, reject ) => {
			params.thum = ( params.thum === undefined )? define.server.defaultThum: params.thum;
			params.connection = params.connection.replace( /\n|\t/g, '' );
			params.title = ( params.title === undefined || params.title === "" )? params.connection : params.title;
			params.slideCenter = ( params.slideCenter === undefined )? true : params.slideCenter ;

			ws.emit( 'find', { connection: params.connection,
						protcol: func.getProtcol(),
						dispThreadFlg: true,
						offsetTid: 0,
						limit: 20,
						talknIndex: params.talknIndex,
						called: "changeThread" });

			resolve( Object.assign( {}, { type: "CHANGE_THREAD"}, params ) );
		}
		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{ return next( error ) };
		break;

	case "CATCH_RESPONSE":

		promiseCondition = ( resolve, reject ) => {
			console.log("-- " + params.called);
			switch( params.called ){
			case "updateWatchCnt":
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_WATCH_CNT" }, params ) );
			case "connectioned":
				console.log(params);
				resolve({ type: "CONNECTIONED", ...params });
				break;
			case "savePost" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE" }, params ) );
				break;
			case "find":
			case "getMore":
			case "changeThread":

				if( ws.indexConnectionMap[ params.connection ] === undefined ){

					ws.indexConnectionMap[ params.connection ] = [];
				}

				if( $.inArray( params.talknIndex, ws.indexConnectionMap[ params.connection ] ) === -1 ){

					ws.indexConnectionMap[ params.connection ].push( params.talknIndex );

				}
				params.index.meta.connection = params.connection;
				params.index.meta.type = params.index.type;
				params.index.meta.title = params.index.title;
				params.index.meta.thum = params.index.thum;

				resolve( Object.assign( {},{ type: "CATCH_RESPONSE" }, params ) );
				break;
			case "getApiMeta" :

				params.index.meta.connection = params.connection;
				params.index.meta.type = params.index.type;
				params.index.meta.title = params.index.title;
				params.index.meta.thum = params.index.thum;
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_META" }, params ) );
				break;
			case "getApiSocial" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_SOCIAL" }, params ) );
				break;
			case "getApiMovie" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_MOVIE" }, params ) );
				break;
			case "getApiPicture" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_PICTURE" }, params ) );
				break;
			case "getApiWikipedia" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_WIKIPEDIA" }, params ) );
				break;
			case "getApiAnalyze" :
				resolve( Object.assign( {},{ type: "CATCH_RESPONSE_API_ANALYZE" }, params ) );
				break;
			}
		}

		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{
			return next( {type: "CATCH_RESPONSE"} )
		};
		break;
	case "POST":
		promiseCondition = ( resolve, reject ) => {

			let talk	= ( params.talk && params.talk !== "" )? params.talk : "" ;
			let connection	= ( params.connection && params.connection !== "" )? params.connection : "" ;
			let thum	= ( params.thum && params.thum !== "" )? params.thum : "" ;
			let uid		= ( params.uid && params.uid !== "" )? params.uid : "" ;
			let title	= ( params.title && params.title !== "" )? params.title : "" ;
			let indexId	= ( params.indexId && params.indexId !== "" )? params.indexId : 0 ;
			let protcol	= ( params.protcol && params.protcol !== "" )? params.protcol : "protcol" ;

			if( thum !== "" && thum.indexOf( "http" ) === -1 ){
				thum = func.getProtcol() + thum;
			}

			let req		= {
						post:{
							talk: talk,
							connection: connection,
							thum: thum,
							uid: uid,
							title: title,
							protcol: protcol,
							indexId: indexId
						}
			};

			ws.emit( 'postTalkn', req );

			resolve( Object.assign( {}, { type: "POST", talknIndex: params.talknIndex }, req ) )
		}
		promiseThen = ( response )=>{
			let $textArea = $( "#talkn" + response.talknIndex + " textarea.post" );
			$textArea.val('');
			if( define.isTouch === false ) $textArea.focus();
			return next( response )
		};
		promiseError = ( error )=>{
			console.log( error );
			//return next( response )
		};
		break;
	case "DELETE_INDEX":

		promiseCondition = ( resolve, reject ) => {
			params.connection = params.connection.replace( /\n|\t/g, '' );

			ws.off( params.connection, talknAPI.catchResponse );
			delete ws.indexConnectionMap[ params.connection ];
			resolve( { type: "DELETE_INDEX", talknIndex: params.talknIndex, connection: params.connection } )

		}
		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{
			return next( {type: "DELETE_INDEX" } )
		};
		break;
	case "GET_API_META":
		promiseCondition = ( resolve, reject ) => {

			params.connection = params.connection.replace( /\n|\t/g, '' );

			ws.emit( 'getApiMeta', { connection: params.connection,
						talknIndex: params.talknIndex,
						called: "getApiMeta" });

			resolve( {	type: "GET_API_META",
					talknIndex: params.talknIndex,
					connection: params.connection
			});
		}
		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{
			return next( {type: "GET_API_META" } )
		};

		break
	case "GET_API_ANALYZE":
		promiseCondition = ( resolve, reject ) => {

			params.connection = params.connection.replace( /\n|\t/g, '' );

			ws.emit( 'getApiAnalyze', { connection: params.connection,
						talknIndex: params.talknIndex,
						called: "getApiAnalyze" });

			resolve( {	type: "GET_API_ANALYZE",
					talknIndex: params.talknIndex,
					connection: params.connection
			});
		}
		promiseThen = ( response )=>{ return next( response ) };
		promiseError = ( error )=>{
			return next( {type: "GET_API_ANALYZE" } )
		};

		break
	}

	let promise =  new Promise( promiseCondition );
	return promise.then( promiseThen, promiseError );
}
