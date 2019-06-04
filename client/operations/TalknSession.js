import conf from 'client/conf'
import define from 'common/define';

export default class TalknSession{

	static getBaseKey(connection){
		return `${define.storageKey.baseKey}${connection}`;
	}

	static setStorage( rootConnection, key, value ){
		if(key){
			const baseKey = TalknSession.getBaseKey(rootConnection);
			let items = JSON.parse( localStorage.getItem( baseKey ) );
			items = JSON.stringify( {...items, [key]: value} );
			localStorage.setItem( baseKey, items );
			return true;
		}else{
			return false;
		}
	}

	static getStorage( rootConnection, key ){
		const baseKey = TalknSession.getBaseKey(rootConnection);
		const item = JSON.parse( localStorage.getItem( baseKey ) );
		return item && item[key] ? item[key] : {};
	}

	static getCaches( rootConnection ){
		const menuLogs = TalknSession.getStorage( rootConnection, define.storageKey.menuLogs );
		const app = TalknSession.getStorage( rootConnection, define.storageKey.app );
		const thread = TalknSession.getStorage( rootConnection, define.storageKey.thread );
		const setting = TalknSession.getStorage( rootConnection, define.storageKey.setting );
		return {menuLogs, app, thread, setting};
	}
}
