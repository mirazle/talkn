import io from 'socket.io-client';
import configureStore from 'client/store/configureStore'
import State from 'common/schemas/state';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';

const env = {};
env.mode = location.href.indexOf( 'localhost:8080/' ) >= 0 ? 'DEV' : 'PROD' ;
env.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
env.server = env.mode === 'DEV' ? 'localhost' : 'client.talkn.io' ;
env.port = env.protcol === 'https' ? 10443 : 10001;
env.scriptName = env.mode === 'DEV' ? 'talkn.client.js' : '//client.talkn.io' ;

function bootTalkn( appType, talknIndex, attributes, env ){
	const {server, port} = env;
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
		bootTalkn( appType, 0, {}, env );
		break;
	case 'script':

		const scripts = document.querySelectorAll(`script[src*="${env.scriptName}"]`);
		scripts.forEach( ( script, index ) => {
			bootTalkn( appType, index + 1 , script.attributes, env );
 		});

		window.talknAPI = window.__talknAPI__[ 1 ];
	}
}
