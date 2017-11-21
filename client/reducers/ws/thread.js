import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let focusConnection = [];
let _state = [];

export default ( state = {

}
, action ) => {
	switch ( action.type ) {
	case 'INIT_ACTION':
		_state[ action.talknIndex ] = [];
		return $.extend( true, state, _state );
	case 'FIND':	

		if( action.called !== "getMore" ){
			_state[ action.talknIndex ] = [];
			state[ action.talknIndex ] = [];
			focusConnection[ action.talknIndex ] = action.connection;
		}
		return state;
	case 'CATCH_RESPONSE':	

		let tmpState = []

		if( action.post ){

			switch( action.called ){
			case "getMore":
				if( focusConnection[ action.talknIndex ] === action.connection ){
					state[ action.talknIndex ] = action.post.concat( state[ action.talknIndex ] );
				}
				break;
			case "find":
				if( focusConnection[ action.talknIndex ] === action.connection ){
					tmpState = state[ action.talknIndex ].concat( action.post );
					$.merge( state[ action.talknIndex ], tmpState );
				}
				break;
			case "changeThread":
				tmpState = state[ action.talknIndex ].concat( action.post );
				$.merge( state[ action.talknIndex ], tmpState );
				focusConnection[ action.talknIndex ] = action.connection;
				break;
			case "savePost":
				if( focusConnection[ action.talknIndex ] === action.connection ){
					state[ action.talknIndex ] = state[ action.talknIndex ].concat( action.post );
					focusConnection[ action.talknIndex ] = action.connection;
				}
				break;
			}
		}

		return $.extend( true, {}, state );
		break;
	case "CHANGE_THREAD":
		_state[ action.talknIndex ] = [];
		state[ action.talknIndex ] = [];
		focusConnection[ action.talknIndex ] = action.connection;
		return state;
	}
	return state;
};

