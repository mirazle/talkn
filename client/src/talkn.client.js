import io from 'socket.io-client';
import configureStore from 'client/store/configureStore'
import conf from 'client/conf';
import State from 'common/schemas/state';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';

function bootTalkn( appType, talknIndex, attributes, conf ){
	const {server, port} = conf;
	const ws = io(`//${server}:${port}`, { forceNew: true });
	const store = configureStore();
	const state = new State( appType, talknIndex, window, attributes );
	const connection = state.connection;
	const talknSession = new TalknSession( state );
	const talknAPI = new TalknAPI( talknIndex, ws, store, connection );
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
		bootTalkn( appType, 0, {}, conf );
		break;
	case 'iframe':
	case 'script':
		const scripts = document.querySelectorAll(`script[src*="${conf.scriptName}"]`);

		scripts.forEach( ( script, index ) => {
			bootTalkn( appType, index + 1 , script.attributes, conf );
 		});

		window.talknAPI = window.__talknAPI__[ 1 ];
	}
}
