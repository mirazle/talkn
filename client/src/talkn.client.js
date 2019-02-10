import 'babel-polyfill';
import define from 'common/define';
import State from 'common/schemas/state';
import BootOption from 'common/schemas/state/BootOption';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import TalknViewer from 'client/operations/TalknViewer';
import TalknSetupJs from 'client/operations/TalknSetupJs';
import configureStore from 'client/store/configureStore'
import conf from 'client/conf';

class TalknClient{
	constructor(){
		this.setupWindow();
		this.onLoad = this.onLoad.bind(this);
		window.onload = this.onLoad.bind(this);
	}

	setupWindow(){
		window.talknIndex = window.talknIndex ? window.talknIndex + 1 : 1;
		if( !window.TalknAPI ) window.TalknAPI = TalknAPI;
		if( !window.__talknAPI__ ) window.__talknAPI__ = [];
		if( !window.name ) window.name = "talkn";
	}

	getScriptName(appType){
		const { PORTS, APP_TYPES } = define;
		let scriptName = 'talkn.client.js';
		if( appType !== APP_TYPES.EXTENSION ){
			scriptName = Number( location.port ) === PORTS.DEVELOPMENT ? 'talkn.client.js' : conf.clientURL;
		}
		return scriptName;
	}

	onLoad(e){
		const appType = TalknViewer.getAppType(e);
		const scriptName = this.getScriptName(appType);
		const script = document.querySelector(`script#talkn`);
		this.boot( appType, window.talknIndex, script.attributes );
		window.talknAPI = window.__talknAPI__[ window.talknIndex ];
	}

	boot(appType, talknIndex, attributes){
		const store = configureStore();
		const bootOption = BootOption.rebuildAttributes(attributes);
		const caches = TalknSession.getCaches(bootOption.connection);
		const state = new State( appType, talknIndex, window, bootOption, caches );
		const talknAPI = new TalknAPI( talknIndex, store, state, bootOption.connection );
		const talknViewer = new TalknViewer( state, talknAPI );

		TalknSetupJs.setupMath();
		talknViewer.addWindowEventListener( talknAPI );
		talknAPI.initClientState( state );
		talknViewer.render();
		TalknSession.listenWorker( state );
	}
}

const talknClient = new TalknClient();