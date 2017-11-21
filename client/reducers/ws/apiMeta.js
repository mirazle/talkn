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

		return $.merge( [], _state );
	case 'FIND':
		let findAction = new Object();
		findAction.tid = 0;
		findAction.connection = action.connection;
		findAction.thum = action.thum;
		findAction.title = action.title;
		findAction.keywords = action.keywords;
		findAction.ogName = action.ogName;
		findAction.ogType = action.ogType;
		findAction.ogTwId = action.ogTwId;
		findAction.ogFbId = action.ogFbId;
		findAction.desc = action.desc;
		findAction.talk = "";

		state[ action.talknIndex ] = findAction;
		return $.extend( true, {}, state );

	case 'CATCH_RESPONSE':

//    if(action.talknIndex){

  		metaInDB = ( action.meta )? action.meta : {} ;

  		if( func.isFocusThreadEqSite( action.talknIndex ) ){

  			// SAT STATE WHEN FIND
  			metaInDB.cnt = metaInDB.cnt;
  			metaInDB.title = state[ action.talknIndex ].title;
  			metaInDB.desc = state[ action.talknIndex ].desc;
  			metaInDB.ogFbId = state[ action.talknIndex ].ogFbId;
  			metaInDB.ogName = state[ action.talknIndex ].ogName;
  			metaInDB.ogTwId = state[ action.talknIndex ].ogTwId;
  			metaInDB.ogType = state[ action.talknIndex ].ogType;
  			metaInDB.keywords = state[ action.talknIndex ].keywords;
  			metaInDB.connection = action.connection;

  		}else{
console.log(action);
  			catchThreadLength = action.post.length;

  			if( catchThreadLength === 0 ){

  				metaInDB.cnt = 0;
  				metaInDB.title = "";
  				metaInDB.desc = "";
  				metaInDB.ogFbId = "";
  				metaInDB.ogName = "";
  				metaInDB.ogTwId = "";
  				metaInDB.ogType = "";
  				metaInDB.keywords = "";
  				metaInDB.connection = action.connection;
  			}else{

  				metaInDB.cnt = ( metaInDB.cnt )? metaInDB.cnt : 0 ;
  				metaInDB.title = ( metaInDB.title )? metaInDB.title : "" ;
  				metaInDB.desc = ( metaInDB.desc )? metaInDB.desc: "" ;
  				metaInDB.ogFbId = ( metaInDB.ogFbId )? metaInDB.ogFbId : "" ;
  				metaInDB.ogName = ( metaInDB.ogName )? metaInDB.ogName : "" ;
  				metaInDB.ogTwId = ( metaInDB.ogTwId )? metaInDB.ogTwId : "" ;
  				metaInDB.ogType = ( metaInDB.ogType )? metaInDB.ogType : "" ;
  				metaInDB.keywords = ( metaInDB.keywords )? metaInDB.keywords : [] ;
  				metaInDB.connection = action.connection;
  			}
  		}

  		state[ action.talknIndex ] = metaInDB;
  		return $.extend( true, {}, state );
//    }
	case "CATCH_RESPONSE_API_META":
		metaInDB = action.index.meta;
		let isExist = ( Object.keys( metaInDB ).length > 0 )? true : false ;
		metaInDB.cnt = ( isExist && metaInDB.cnt )? metaInDB.cnt : 0 ;
		metaInDB.title = ( isExist && metaInDB.title )? metaInDB.title : "" ;
		metaInDB.desc = ( isExist && metaInDB.desc )? metaInDB.desc: "" ;
		metaInDB.ogFbId = ( isExist && metaInDB.ogFbId )? metaInDB.ogFbId : "" ;
		metaInDB.ogName = ( isExist && metaInDB.ogName )? metaInDB.ogName : "" ;
		metaInDB.ogTwId = ( isExist && metaInDB.ogTwId )? metaInDB.ogTwId : "" ;
		metaInDB.ogType = ( isExist && metaInDB.ogType )? metaInDB.ogType : "" ;
		metaInDB.connection = action.connection;
		state[ action.talknIndex ] = metaInDB;
		return $.extend( true, {}, state );
  }
};
