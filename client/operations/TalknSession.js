import define from 'client/util/define'

export default class TalknSession{

	constructor( state ){
		this.state = state;

		const { type, talknIndex } = this.state;
		switch( type ){
		case 'plugin':
			TalknSession.listenChrome( state );
			break;
		}
	}

	getSetting(){
		const { type, talknIndex } = this.state.app;
		let promiseCondition = () => {};

		switch( type ){
		case 'plugin':
			promiseCondition = ( resolve, reject ) => {
				chrome.runtime.sendMessage( { method: "getItem", key: define.cacheKey.setting + talknIndex, function(){} } );
			}
			break;
		case 'electron':
		case 'script':
			promiseCondition = ( resolve, reject ) => {
				resolve( { setting: JSON.parse( localStorage.getItem( define.cacheKey.setting + talknIndex ) ), self: self } );
			}
			break;
		}
		return new Promise( promiseCondition );
	}

	static listenChrome( state ){
		const { type, talknIndex } = state.app;
		chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {
			// Session setting .
			if( result.requestKey === define.cacheKey.setting + talknIndex ){
				resolve( { setting: result.response, self: self } );
			}

			// Session index .
			if( result.requestKey === define.cacheKey.index + talknIndex ){
				let connectionList = result.response;
				// TODO FIND
				//func.findMap( talknIndex, connectionList, focusMeta );
			}
		});
	}
}
