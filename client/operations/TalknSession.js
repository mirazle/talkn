import conf from 'client/conf'
import define from 'common/define';

export default class TalknSession{

	static getBaseKey(connection){
		return `${define.storageKey.baseKey}${connection}`;
	}

	static setStorage( rootConnection, key, value ){
		const baseKey = TalknSession.getBaseKey(rootConnection);
		let items = JSON.parse( localStorage.getItem( baseKey ) );
		items = JSON.stringify( {...items, [key]: value} );
		localStorage.setItem( baseKey, items );
		return true;
	}

	static getStorage( rootConnection, key ){
		const baseKey = TalknSession.getBaseKey(rootConnection);
		const item = JSON.parse( localStorage.getItem( baseKey ) );
		return item && item[key] ? item[key] : {};
	}

	static getCaches( rootConnection ){
		const menuLogs = TalknSession.getStorage( rootConnection, define.storageKey.menuLogs );
		const app = TalknSession.getStorage( rootConnection, define.storageKey.app );
		const setting = TalknSession.getStorage( rootConnection, define.storageKey.setting );
		return {menuLogs, app, setting};
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
