import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let focusConnection = [];
let _state = [];
let stateLength = 0;
let catchThreadLength = 0;
let postedObj = {};
let indexedObjConnection = "";
let changeThreadConnection = "";

export default ( state = [], action ) => {

  switch ( action.type ) {
	case 'FIND':
		state[ action.talknIndex ] = [];
		state[ action.talknIndex ] = [];
		focusConnection[ action.talknIndex ] = action.connection;

		let postsObj = new Object();
		postsObj[ "connection" ] = action.connection;
		postsObj[ "multiStream0" ] = [];
		postsObj[ "multiStream1" ] = [];
		state[ action.talknIndex ] = postsObj;

		return state;
		break;
	case 'CATCH_RESPONSE':

    if( action.talknIndex && action.connection ){

  		if( focusConnection[ action.talknIndex ] === action.connection ){

  			let post = ( action.post )? action.post : [] ;
  			let catchThreadLength = post.length;

  			/************************/
  			/* MultiStream0( OFF )	*/
  			/************************/

  			// Loop For Set MultiStream OFF Data .
  			for( let i = ( catchThreadLength - 1 ); 0 <= i; i--  ){

  				// If MultiStream0 Index .
  				if( action.post[ i ][ "connection" ] === focusConnection[ action.talknIndex ] ){

  					// Set MultiStream OFF Data .
  					state[ action.talknIndex ][ "multiStream0" ].push( action.post[ i ] );
  				}
  			}

  			/************************/
  			/* MultiStream1( ON )	*/
  			/************************/

  			// Set MultiStream ON Data( Last Post Data ) .
  			state[ action.talknIndex ][ "multiStream1" ] = post;

  			return $.extend( true, {}, state );
  		}
    }

		break;
	}

	return state;

};
