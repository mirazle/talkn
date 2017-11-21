import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let _state = [];

export default ( state = {}, action ) => {
	switch ( action.type ) {
	case 'CATCH_RESPONSE_SETTING_DATA':
		_state[ action.talknIndex ] = action;
		delete _state[ action.talknIndex ][ "type" ];
		delete _state[ action.talknIndex ][ "_id" ];
		return $.extend( {}, _state );
	}

	return state;
};

