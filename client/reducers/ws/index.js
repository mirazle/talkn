import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let _state = [];
let stateLength = 0;
let catchThreadLength = 0;
let indexedObj = {};
let indexedObjConnection = "";
let changeThreadConnection = "";

export default ( state = [], action ) => {
        switch ( action.type ) {
	default:
		return state;
		break
	case 'CONNECT':
		_state[ action.talknIndex ] = []

		return $.merge( [], _state );
	case 'FIND':

		if( action.called !== "getMore"){

			let findAction = new Object();
			findAction.postTime = new Date(Date.UTC(96, 11, 1, 0, 0, 0));
			findAction.connection = action.connection;
			findAction.thum = action.thum;
			findAction.title = action.title;
			findAction.talk = "";

			let indexObj = new Object();
			indexObj[ "connection" ] = action.connection;
			indexObj[ "indexId" ] = 0;
			indexObj[ "called" ] = false;//action.called;
			indexObj[ "multiStream0" ] = { connection: action.connection }
			indexObj[ "multiStream1" ] = { connection: action.connection }
			$.extend( true, indexObj[ "multiStream0" ], findAction );
			$.extend( true, indexObj[ "multiStream1" ], findAction );

			state[ action.talknIndex ].unshift( indexObj );
		}

		return $.extend( true, {}, state );
	case 'CATCH_RESPONSE':

		if( action.talknIndex && action.called !== "getMore"){

			let setConnectionList = [];
			stateLength = state[ action.talknIndex ].length ;
			catchThreadLength = ( action.post.length )? action.post.length: 0 ;
			let catchPathArr = func.getPathArr( action.connection );
			let catchPathArrLength = ( catchPathArr.length - 1 );

			// Loop Have All Index .
			for( let indexNum = 0; indexNum < stateLength; indexNum++ ){

				// Define Short Hand Variables .
				indexedObj = state[ action.talknIndex ][ indexNum ];

				// Block Duplicate Index .
				if( $.inArray( indexedObj.connection, setConnectionList ) !== -1 ) continue;

				setConnectionList.unshift( indexedObj.connection );

				/****************/
				/* LOGIC	*/
				/****************/

				// If Catch Response Have Index .
				if( $.inArray( indexedObj.connection, catchPathArr ) !== -1 ) {

					indexedObj[ "indexId" ] = ( action.index && action.index._id )? action.index._id : indexedObj["indexId"] ;
					indexedObj[ "called" ] = action.called;

					// If Exist Catch Response .
					if( catchThreadLength > 0 ){

						let catchPostTime = "";
						let indexedPostTime0 = ( typeof indexedObj[ "multiStream0" ][ "postTime" ] === "string" )?
							new Date( indexedObj[ "multiStream0" ][ "postTime" ] ) :
							indexedObj[ "multiStream0" ][ "postTime" ] ;

						let indexedPostTime1 = ( typeof indexedObj[ "multiStream1" ][ "postTime" ] === "string" )?
							new Date( indexedObj[ "multiStream1" ][ "postTime" ] ) :
							indexedObj[ "multiStream1" ][ "postTime" ] ;

						/************************/
						/* MultiStream0( OFF )	*/
						/************************/

						// Loop For Set MultiStream OFF Data .
						for( let i = ( catchThreadLength - 1 ); 0 <= i; i--  ){

							// If MultiStream0 Index .
							if( action.post[ i ][ "connection" ] === indexedObj.connection ){

								catchPostTime = ( typeof action.post[ i ][ "postTime" ] === "string" )? new Date( action.post[ i ][ "postTime" ] ) : action[ i ][ "postTime" ] ;

								// If New Post Talkn ( postTime ) .
								if( indexedPostTime0 < catchPostTime ){

									// Set MultiStream OFF Data .
									indexedObj[ "multiStream0" ] = action.post[ i ];
									indexedObj[ "multiStream0" ].connection = indexedObj.connection;
									indexedObj[ "multiStream0" ].cnt = ( action.index && action.index.cnt )? action.index.cnt : 0 ;
									break;
								}
							}
						}

						/************************/
						/* MultiStream1( ON )	*/
						/************************/

						catchPostTime = ( typeof action.post[ catchThreadLength - 1 ][ "postTime" ] === "string" )?
							new Date( action.post[ catchThreadLength - 1 ][ "postTime" ] ) :
							action.post[ catchThreadLength - 1 ][ "postTime" ] ;

						// If New Post Talkn ( postTime ) .
						if( indexedPostTime1 < catchPostTime ){

							// Set MultiStream ON Data( Last Post Data ) .
							indexedObj[ "multiStream1" ] = action.post[ catchThreadLength - 1 ];
							indexedObj[ "multiStream1" ].connection = indexedObj.connection;
							indexedObj[ "multiStream1" ].cnt = ( action.index && action.index.cnt )? action.index.cnt : 0 ;
						}
					}
				}

				state[ action.talknIndex ][ indexNum ] = indexedObj;
			}
		}

		return $.extend( true, {}, state );
	case "CATCH_RESPONSE_ACTION":

		stateLength = state[ action.talknIndex ].length ;

		// Loop Have All Index .
		for( let indexNum = 0; indexNum < stateLength; indexNum++ ){

			// Define Short Hand Variables .
			indexedObj = state[ action.talknIndex ][ indexNum ];

			if( action.connection === indexedObj.connection ){
//				indexedObj.called = "";
				state[ action.talknIndex ][ indexNum ] = indexedObj;
			}
		}

		return $.extend( true, {}, state );
		break;
	case "PRE_DELETE_INDEX":
		stateLength = state[ action.talknIndex ].length ;

		if( stateLength >= 2 ){

			changeThreadConnection = state[ action.talknIndex ][ 1 ].connection;

			for( let indexNum = 0; indexNum < stateLength; indexNum++ ){

				// Define Short Hand Variables .
				indexedObj = state[ action.talknIndex ][ indexNum ];

				if( action.connection === indexedObj.connection ){
					state[ action.talknIndex ][ indexNum ][ "called" ] = "deleteConnection:" + indexedObj.connection + ",changeConnection:" + changeThreadConnection;
					break;
				}
				changeThreadConnection = indexedObj.connection;
			}
		}

		return $.extend( true, {}, state );
	case "DELETE_INDEX":
		stateLength = state[ action.talknIndex ].length ;

		if( stateLength >= 2 ){

			for( let indexNum = 0; indexNum < stateLength; indexNum++ ){

				// Define Short Hand Variables .
				indexedObj = state[ action.talknIndex ][ indexNum ];

				if( action.connection === indexedObj.connection ){
					state[ action.talknIndex ].splice( indexNum, 1 ) ;
					break;
				}
			}
		}

		return $.extend( true, {}, state );
	}

	return $.merge( [], state );
};
