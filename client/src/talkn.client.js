import io from 'socket.io-client';
import configureStore from 'client/store/configureStore'
import conf from 'common/conf';
import State from 'common/schemas/state';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';

conf.protcol = location.href.indexOf( 'https' ) === 0 ? 'https' : 'http' ;
conf.server = conf.env === 'development' ? 'localhost' : 'client.talkn.io' ;
conf.port = conf.protcol === 'https' ? 10443 : 10001;
conf.scriptName = '//client.talkn.io' ;

if( conf.env === 'development' ){
	switch( location.port ){
	case '8000': conf.scriptName = '//localhost:8001'; break;
	case '8080': conf.scriptName = 'talkn.client.js'; break;
	}
}

function bootTalkn( appType, talknIndex, attributes, conf ){
	const {server, port} = conf;
console.log( conf );
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
	case 'script':
console.log( conf );
		const scripts = document.querySelectorAll(`script[src*="${conf.scriptName}"]`);

		scripts.forEach( ( script, index ) => {
			bootTalkn( appType, index + 1 , script.attributes, conf );
 		});

		window.talknAPI = window.__talknAPI__[ 1 ];
	}
}
