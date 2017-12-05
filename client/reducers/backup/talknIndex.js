//import merge from 'lodash/merge'
import $ from 'jquery'

export default ( state, action ) => {
	switch( action.type ){
	case "INIT_ACTION":
		return {...action}
		break;
	case "SET_TALKN_INDEX":
		return ( typeof action.talknIndex === "undefined" )? null : action.talknIndex ;
		break;
	default:
		return ( typeof action.talknIndex === "undefined" )? null : action.talknIndex ;
	}
};
