import define from '../../util/define'
import func from '../../util/func'
import $ from 'jquery'

let _state = [];
let indexInDB = {}
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

		indexInDB = action.post.index;

		if( func.isFocusThreadEqSite( action.talknIndex ) ){

			// SAT STATE WHEN FIND
			indexInDB.cnt = indexInDB.cnt;
			indexInDB.title = state[ action.talknIndex ].title;
			indexInDB.desc = state[ action.talknIndex ].desc;
			indexInDB.ogFbId = state[ action.talknIndex ].ogFbId;
			indexInDB.ogName = state[ action.talknIndex ].ogName;
			indexInDB.ogTwId = state[ action.talknIndex ].ogTwId;
			indexInDB.ogType = state[ action.talknIndex ].ogType;
			indexInDB.keywords = state[ action.talknIndex ].keywords;
			indexInDB.connection = action.connection;

		}else{

			catchThreadLength = action.post.thread.length;
			
			if( catchThreadLength === 0 ){

				indexInDB.cnt = 0;
				indexInDB.title = "";
				indexInDB.desc = "";
				indexInDB.ogFbId = "";
				indexInDB.ogName = "";
				indexInDB.ogTwId = "";
				indexInDB.ogType = "";
				indexInDB.keywords = "";
				indexInDB.connection = action.connection;
			}else{
console.log( indexInDB );
				indexInDB.cnt = ( indexInDB.cnt )? indexInDB.cnt : 0 ;
				indexInDB.title = ( indexInDB.title )? indexInDB.title : "" ;
				indexInDB.desc = ( indexInDB.desc )? indexInDB.desc: "" ;
				indexInDB.ogFbId = ( indexInDB.ogFbId )? indexInDB.ogFbId : "" ;
				indexInDB.ogName = ( indexInDB.ogName )? indexInDB.ogName : "" ;
				indexInDB.ogTwId = ( indexInDB.ogTwId )? indexInDB.ogTwId : "" ;
				indexInDB.ogType = ( indexInDB.ogType )? indexInDB.ogType : "" ;
				indexInDB.keywords = ( indexInDB.keywords )? indexInDB.keywords : [] ;
				indexInDB.connection = action.connection;
			}
		}

		state[ action.talknIndex ] = indexInDB;
		return $.extend( true, {}, state );
	case "CATCH_RESPONSE_META":

		indexInDB = action.index;
		indexInDB.cnt = ( indexInDB.cnt )? indexInDB.cnt : 0 ;
		indexInDB.title = ( indexInDB.title )? indexInDB.title : "" ;
		indexInDB.desc = ( indexInDB.desc )? indexInDB.desc: "" ;
		indexInDB.ogFbId = ( indexInDB.ogFbId )? indexInDB.ogFbId : "" ;
		indexInDB.ogName = ( indexInDB.ogName )? indexInDB.ogName : "" ;
		indexInDB.ogTwId = ( indexInDB.ogTwId )? indexInDB.ogTwId : "" ;
		indexInDB.ogType = ( indexInDB.ogType )? indexInDB.ogType : "" ;
		indexInDB.connection = action.connection;
		state[ action.talknIndex ] = indexInDB;
		return $.extend( true, {}, state );
	}
};

