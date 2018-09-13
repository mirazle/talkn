import conf from 'client/conf'
import define from 'common/define';

export default class TalknSession{

	static setStorage( key, value ){
    return localStorage.setItem( key, JSON.stringify( value ) );
  }

	static getStorage( key ){
    return JSON.parse(localStorage.getItem( key ));
  }

	static getCaches(){
		const menuLogs = TalknSession.getStorage( define.storageKey.menuLogs );
		const selectMenu = TalknSession.getStorage( define.storageKey.selectMenu );
		return {menuLogs, selectMenu};
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

	static listenWorker( state ){
		const { type, talknIndex } = state.app;

		if( chrome && chrome.runtime && chrome.runtime.onMessage ){

			chrome.runtime.onMessage.addListener( ( result, sender, sendResponse ) => {

				console.log("LISTEN WORKER");
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
}
