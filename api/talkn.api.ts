import io from "socket.io-client";
import conf from "client/conf";
import define from "common/define";
import Message from "common/Message";
import Schema from "api/store/Schema";
import State from "api/store/";
import Sequence from "api/Sequence";
import PublicApi from "api/public.api";
import configureStore from "api/store/configureStore";
import handleActions from "api/actions/handles";
import WsServerToClientEmitAction from "api/actions/ws/serverToClientEmit";
import WsClientToServerEmitActions from "api/actions/ws/clientToServerEmit";
import WsServerToClientBroadcastAction from "api/actions/ws/serverToClientBradcast";

declare global {
  interface Window {
    $t: any;
    talknAPI: any;
    talknWindow: any;
    talknMedia: any;
    Youtube: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

class BootOption {
  constructor() {
    const apiScript = document.querySelector(`script[src='https://${conf.apiAccessURL}']`);
    const clientScript = document.querySelector(`script[src='https://${conf.clientURL}']`);
    const extScript = document.querySelector(`script[src='https://${conf.extURL}']`);
    const apiScriptAtt = apiScript ? BootOption.rebuildAttributes(apiScript.attributes) : {};
    const extScriptAtt = extScript ? BootOption.rebuildAttributes(extScript.attributes) : {};
    const bootParams = { ...extScriptAtt, ...apiScriptAtt };
    const bootOption: any = BootOption.initialBootOption(bootParams, clientScript);
    return bootOption;
  }

  static rebuildAttributes(attributes) {
    let rebuildAttributesObj: any = {};
    Object.keys(attributes).forEach(i => {
      rebuildAttributesObj[attributes[i].name] = attributes[i].value;
    });
    return rebuildAttributesObj;
  }

  static initialBootOption(bootOption, clientScript) {
    bootOption.ch = bootOption.ch ? bootOption.ch : location.href.replace("https:/", "").replace("http:", "");
    if (conf.env === define.DEVELOPMENT) {
      bootOption.ch = bootOption.ch.replace(`/${define.LOCALHOST}:${define.PORTS.DEVELOPMENT}`, "");
    }

    bootOption.hasslash = BootOption.getHasSlach(bootOption);
    bootOption.type = clientScript ? define.APP_TYPES.PORTAL : define.APP_TYPES.EXTENSION;
    delete bootOption.src;
    delete bootOption.async;
    return bootOption;
  }

  static getHasSlach(bootOption) {
    if (bootOption.href) {
      const ch = bootOption.href.replace("https:/", "").replace("http:/", "");
      return ch.lastIndexOf("/") === ch.length - 1;
    } else {
      return bootOption.hasslash ? Schema.getBool(bootOption.hasslash) : false;
    }
  }
}

class CoreAPI {
  ws: any;
  store: any;
  state: any;
  ch: string;
  constructor(store, resolve) {
    const wsServer =
      location.host.indexOf(define.PRODUCTION_DOMAIN) >= 0 ? define.PRODUCTION_DOMAIN : define.DEVELOPMENT_DOMAIN;
    this.store = store;
    this.ws = io(`https://${wsServer}:${define.PORTS.SOCKET_IO}`, { forceNew: true });
    this.onResponseMeAPI(resolve);
    this.setUp = this.setUp.bind(this);
  }

  setUp(state, ch) {
    this.state = state;
    this.ch = ch;

    // COMMUNUCATION API’s
    this.onResponseChAPI();
    this.onRequestAPI();
  }

  onRequestAPI() {
    const actions = WsClientToServerEmitActions;
    const actionKeys = Object.keys(actions);
    const actionLength = actionKeys.length;
    const getCoreAPI = (actionName, beforeFunction) => {
      return (requestParams1, requestParams2) => {
        const reduxState = this.store.getState();
        const _requestState = Sequence.getRequestState(actionName, reduxState, requestParams1);
        const _actionState = Sequence.getRequestActionState(actionName, requestParams1, requestParams2);
        const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
        this.ws.emit(requestState.type, requestState);
        return this.store.dispatch(actionState);
      };
    };

    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      const actionPlainName = actionName.replace(Sequence.CLIENT_TO_SERVER_EMIT, "");
      const beforeFunction = actions[actionName];
      this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
    }
  }

  onResponseMeAPI(resolve: Promise<boolean> | null = null) {
    const getToMeAPI = (action, resolve = null) => {
      const self = this;
      return response => {
        if (resolve && response.type === Sequence.CONNECTION_SERVER_KEY) {
          resolve(self);
        }

        const actionState = action(response);
        return this.store.dispatch(actionState);
      };
    };
    const callback: any = getToMeAPI(WsServerToClientEmitAction, resolve);
    this.on(Sequence.CATCH_ME_KEY, callback);
  }

  onResponseChAPI(ch = this.ch) {
    const getResponseChAPI = actionMethod => {
      return response => {
        const actionState = actionMethod(response);
        return this.store.dispatch(actionState);
      };
    };
    // To connect redux flow.
    const callback: any = getResponseChAPI(WsServerToClientBroadcastAction);
    this.on(ch, callback);
  }

  offResponseChAPI(ch = this.ch) {
    this.off(ch);
  }

  on(onKey, callback = () => {}) {
    if (!this.ws._callbacks[`$${onKey}`]) {
      this.ws.on(onKey, callback);
    }
  }

  off(offKey) {
    if (this.ws._callbacks[`$${offKey}`]) {
      this.ws.off(offKey);
    }
  }
}

class GlobalWindow {
  bootId: any;
  bootOption: any;
  globalApi: any;
  coreApi: any;
  origin: string;
  store: any;
  static getRequestObj(method, params: any = {}) {
    const href = location.href;
    return {
      type: Message.coreApiToApp,
      href,
      method: method,
      params: params
    };
  }
  constructor() {
    this.store = configureStore();
    this.bootOption = new BootOption();
    this.exeCoreApi = this.exeCoreApi.bind(this);
    this.exeAction = this.exeAction.bind(this);
    this.appTo = this.appTo.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.onWsServer = this.onWsServer.bind(this);
    this.store.subscribe(this.subscribe);
    this.onActions();

    const bootPromises = [];
    const self = this;

    bootPromises.push(
      new Promise(onMessageResolve => {
        window.onmessage = e => {
          if (onMessageResolve) {
            self.origin = e.origin;
            onMessageResolve();
          }
          if (e.data.type === Message.appToCoreApi) {
            if (e.data.method === Message.connectionMethod) {
              clearInterval(self.bootId);
            } else {
              self.exeCoreApi(e);
            }
          } else if (e.data.type === Message.appToAction) {
            self.exeAction(e);
          }
        };
      })
    );

    bootPromises.push(
      new Promise(resove => {
        if (document.readyState === "complete") {
          new CoreAPI(self.store, resove);
        } else {
          window.onload = e => {
            new CoreAPI(self.store, resove);
          };
        }
      }).then(this.onWsServer)
    );

    Promise.all(bootPromises).then((bootParams: any) => {
      this.bootId = setInterval(() => {
        this.appTo(Message.connectionMethod, this.bootOption);
      }, 200);
    });
  }

  exeCoreApi(e) {
    if (this[e.data.method]) {
      this[e.data.method](e.data.params1, e.data.params2);
    } else if (this.coreApi && this.coreApi[e.data.method]) {
      const { params1, params2 } = e.data;
      if (params1 && params2) {
        this.coreApi[e.data.method](params1, params2);
      } else if (params1) {
        this.coreApi[e.data.method](params1);
      } else {
        this.coreApi[e.data.method]();
      }
    }
  }

  exeAction(e) {
    if (this[e.data.method]) {
      this[e.data.method](e.data.params1, e.data.params2);
    }
  }

  onWsServer(coreApi: any) {
    this.coreApi = coreApi;
    const state = new State(window, this.bootOption);
    this.coreApi.setUp(state, this.bootOption.ch);
    this.coreApi.tuned(state);
    window.$t = new PublicApi(this.coreApi);
  }

  onActions() {
    const actionKeys = Object.keys(handleActions);
    const actionLength = actionKeys.length;
    const getActions = actionName => {
      return (params1, params2) => {
        const action = handleActions[actionName](params1);
        const reduxState = this.store.getState();
        return this.store.dispatch(action);
      };
    };
    for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
      const actionName = actionKeys[actionNodeCnt];
      this[actionName] = getActions(actionName);
    }
  }

  subscribe() {
    const state = this.store.getState();
    if(state.app.actioned === "ON_SCROLL_UPDATE_TIME_MARKER"){
      console.log("@@@@@@@@ " + state.app.actioned);
      console.log(state.uiTimeMarker);
    }
    this.appTo(state.app.actioned, state);
  }

  appTo(method, params = {}) {
    const src = this.origin;
    const requestObj = GlobalWindow.getRequestObj(method, params);
    window.postMessage(requestObj, src);
  }
}
const globalWindow = new GlobalWindow();
