import conf from 'client/conf'

export default class TalknSession{
/*
	constructor( state ){
		this.state = state;

		const { type, talknIndex } = this.state;
		switch( type ){
		case 'plugin':
			TalknSession.listenChrome( state );
			break;
		}
	}
*/
	static setStorage( key, value ){
    return localStorage.setItem( key, JSON.stringify( value ) );
  }

	static getStorage( key ){
    return JSON.parse(localStorage.getItem( key ));
  }

	getSetting(){
		const { type, talknIndex } = this.state.app;
		let promiseCondition = () => {};

		switch( type ){
		case 'plugin':
			promiseCondition = ( resolve, reject ) => {
				chrome.runtime.sendMessage( { method: "getItem", key: conf.cacheKey.setting + talknIndex, function(){} } );
			}
			break;
		case 'electron':
		case 'script':
		case 'portal':
			promiseCondition = ( resolve, reject ) => {
				resolve( { setting: JSON.parse( localStorage.getItem( conf.cacheKey.setting + talknIndex ) ), self: self } );
			}
			break;
		}
		return new Promise( promiseCondition );
	}

	static listenChrome( state ){
		const { type, talknIndex } = state.app;
		chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {
			// Session setting .
			if( result.requestKey === conf.cacheKey.setting + talknIndex ){
				resolve( { setting: result.response, self: self } );
			}

			// Session index .
			if( result.requestKey === conf.cacheKey.index + talknIndex ){
				let connectionList = result.response;
				// TODO FIND
				//func.findMap( talknIndex, connectionList, focusMeta );
			}
		});
	}
}
