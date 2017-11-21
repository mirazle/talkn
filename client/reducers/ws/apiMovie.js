import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let _state = [];
let metaInDB = {}
let catchThreadLength = 0;

export default ( state = [], action ) => {
        switch ( action.type ) {
	default:
		return state;
		break
	case 'CONNECT':
		_state[ action.talknIndex ] = {}
		return $.extend( true, {}, _state );
	case "CATCH_RESPONSE_API_MOVIE":
		delete action.type;
		_state[ action.talknIndex ] = action
		return $.extend( true, {}, _state );
	}
};
