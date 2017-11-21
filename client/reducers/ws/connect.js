//import merge from 'lodash/merge'
import $ from 'jquery'
import func from '../../util/func'
import define from '../../util/define'

export default ( state = {
}, action ) => {
	switch ( action.type ) {
	case 'CONNECT':
		return action.ws
	default :
		return state;
	}
}
