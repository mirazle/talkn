//import merge from 'lodash/merge'
import $ from 'jquery'

let focusConnection = [];

export default ( state = 0 , action ) => {

	switch( action.type ){
	case 'FIND':
	case 'CHANGE_THREAD':
		focusConnection[ action.talknIndex ] = action.connection;
		return state;
	case "CATCH_RESPONSE_WATCH_CNT":

		if( focusConnection[ action.talknIndex ] === action.connection ){
			return action.watchCnt;
		}
		return state;
		break;
	}
	return state;
};
