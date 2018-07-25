import 'babel-polyfill';
import configureStore from 'client/store/configureStore'
import conf from 'client/conf';
import define from 'common/define';
import State from 'common/schemas/state';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';
import TalknSetupJs from 'client/operations/TalknSetupJs';

function bootTalkn( appType, talknIndex, attributes, conf ){
	const store = configureStore();
	const state = new State( appType, talknIndex, window, attributes );
	const connection = state.connection;
	const talknSession = new TalknSession( state );

	const talknAPI = new TalknAPI( talknIndex, store, connection );
	const talknViewer = new TalknViewer( state, talknAPI );

	TalknSetupJs.setupMath();
	talknViewer.addWindowEventListener( talknAPI );
	talknAPI.initClientState( state );
	talknViewer.render();
}

window.onload =  () => {
	const { PORTS, SUB_DOMAINS } = define;
	const appType = TalknViewer.getAppType();
	window.TalknAPI = TalknAPI;
	window.__talknAPI__ = [];

	const scriptName = Number( location.port ) === PORTS.DEVELOPMENT ? 'talkn.client.js' : conf.clientURL;
	const scripts = document.querySelectorAll(`script[src*="${scriptName}"]`);
	scripts.forEach( ( script, index ) => {
		bootTalkn( appType, index + 1 , script.attributes, conf );
	});

	window.talknAPI = window.__talknAPI__[ 1 ];
}
