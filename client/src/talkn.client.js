import 'babel-polyfill';
import define from 'common/define';
import State from 'common/schemas/state';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';
import TalknSetupJs from 'client/operations/TalknSetupJs';
import configureStore from 'client/store/configureStore'
import conf from 'client/conf';

class TalknClient{
	constructor(){
		this.setupWindow();
		this.talknIndex = 0;
		this.onLoad = this.onLoad.bind(this);
		window.onload = this.onLoad.bind(this);
	}

	setupWindow(){
		console.log(window.talknIndex);
		if( window.talknIndex ){
			window.talknIndex = window.talknIndex + 1;
			console.log( "TRUE " + window.talknIndex );
		}else{
			window.talknIndex = 1;
			console.log( "FALSE " + window.talknIndex );
		}

		console.log(window.talknIndex);
		if( !window.TalknAPI ) window.TalknAPI = TalknAPI;
		if( !window.__talknAPI__ ) window.__talknAPI__ = [];
		if( !window.name ) window.name = "talkn";
	}

	onLoad(){
		this.talknIndex++;
		const { PORTS } = define;
		const appType = TalknViewer.getAppType();
		const scriptName = Number( location.port ) === PORTS.DEVELOPMENT ? 'talkn.client.js' : conf.clientURL;
		const script = document.querySelector(`script[src*="${scriptName}"]`);
		this.boot( appType, window.talknIndex, script.attributes );
		console.log( "@@@ " + this.talknIndex );
		window.talknAPI = window.__talknAPI__[ 1 ];
	}

	boot(appType, talknIndex, attributes){
		console.log(appType + " " + talknIndex);
		const store = configureStore();
		const caches = TalknSession.getCaches();
		const state = new State( appType, talknIndex, window, attributes, caches );
		const talknAPI = new TalknAPI( talknIndex, store, state.connection );
		const talknViewer = new TalknViewer( state, talknAPI );
	
		TalknSetupJs.setupMath();
		talknViewer.addWindowEventListener( talknAPI );
		talknAPI.initClientState( state );
		talknViewer.render();
		TalknSession.listenWorker( state );
	}
}

const talknClient = new TalknClient();