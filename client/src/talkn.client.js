
import io from 'socket.io-client';
import configureStore from 'client/store/configureStore'
import State from 'common/schemas/state';
import TalknSession from 'client/operations/talknSession';
import TalknAPI from 'client/operations/talknAPI';
import TalknViewer from 'client/operations/talknViewer';

function bootTalkn( appType, talknIndex, attributes ){
	const ws = io('//localhost:10001', { forceNew: true });
	const store = configureStore();
	const state = new State( appType, talknIndex, window, attributes );
	const talknSession = new TalknSession( state );
	const talknAPI = new TalknAPI( state, store, ws );
	const talknViewer = new TalknViewer( state, talknAPI );

	talknAPI.initClientState( state );
	talknViewer.render();
}

window.onload =  () => {

	const appType = TalknViewer.getAppType();
	window.TalknAPI = TalknAPI;
	window.__talknAPI__ = [];

	switch( appType ){
	case 'plugin':
	case 'electron':
		bootTalkn( appType, 0, {} );
		break;
	case 'script':
		const scripts = document.querySelectorAll('script[src*="talkn.client.js"]');
		scripts.forEach( ( script, index ) => {
			bootTalkn( appType, index + 1 , script.attributes );
 		});

		window.talknAPI = window.__talknAPI__[ 1 ];
	}
}
