import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let _state = [];

export default ( state = [], action ) => {
        switch ( action.type ) {
	case 'CONNECT':
		_state[ action.talknIndex ] = []
		return $.merge( [], _state );
	case 'CATCH_RESPONSE':
    if(action.post){
		  let postCnt = action.post.length - 1;
		  state[ action.talknIndex ].unshift( action.post[ postCnt ] );
		  return $.merge( [], state );
    }
	case 'END_NOTIF':

    if(action.talknIndex){
  		state[ action.talknIndex ] = state[ action.talknIndex ].filter( ( obj, index, array )=>{

  			if( obj === undefined ) return false;

  			if( action.connection === obj.connection ){
  				if( action.notifId === obj._id ){
  					return false;
  				}
  			}
  			return true;
  		});

  		return $.merge( [], state );
    }
	}

	return $.merge( [], state );
};
