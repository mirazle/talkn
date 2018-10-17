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
		const setting = TalknSession.getStorage( define.storageKey.updateSetting );
		const selectMenu = TalknSession.getStorage( define.storageKey.selectMenu );
		return {menuLogs, setting, selectMenu};
	}

	static listenWorker( state ){
		const { talknIndex } = state.app;

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
