"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const conf_1 = __importDefault(require("client/conf"));
const define_1 = __importDefault(require("common/define"));
const Message_1 = __importDefault(require("common/Message"));
const Schema_1 = __importDefault(require("api/store/Schema"));
const store_1 = __importDefault(require("api/store/"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const public_api_1 = __importDefault(require("api/public.api"));
const apiStore_1 = __importDefault(require("api/store/apiStore"));
const handles_1 = __importDefault(require("api/actions/handles"));
const serverToClientEmit_1 = __importDefault(require("api/actions/ws/serverToClientEmit"));
const clientToServerEmit_1 = __importDefault(require("api/actions/ws/clientToServerEmit"));
const serverToClientBradcast_1 = __importDefault(require("api/actions/ws/serverToClientBradcast"));
class BootOption {
    constructor() {
        const apiScript = document.querySelector(`script[src='https://${conf_1.default.apiAccessURL}']`);
        const clientScript = document.querySelector(`script[src='https://${conf_1.default.clientURL}']`);
        const extScript = document.querySelector(`script[src='https://${conf_1.default.extURL}']`);
        const apiScriptAtt = apiScript ? BootOption.rebuildAttributes(apiScript.attributes) : {};
        const extScriptAtt = extScript ? BootOption.rebuildAttributes(extScript.attributes) : {};
        const bootParams = Object.assign(Object.assign({}, extScriptAtt), apiScriptAtt);
        const bootOption = BootOption.initialBootOption(bootParams, clientScript);
        return bootOption;
    }
    static rebuildAttributes(attributes) {
        let rebuildAttributesObj = {};
        Object.keys(attributes).forEach(i => {
            rebuildAttributesObj[attributes[i].name] = attributes[i].value;
        });
        return rebuildAttributesObj;
    }
    static initialBootOption(bootOption, clientScript) {
        bootOption.ch = bootOption.ch ? bootOption.ch : location.href.replace("https:/", "").replace("http:", "");
        if (conf_1.default.env === define_1.default.DEVELOPMENT) {
            bootOption.ch = bootOption.ch.replace(`/${define_1.default.LOCALHOST}:${define_1.default.PORTS.DEVELOPMENT}`, "");
        }
        bootOption.hasslash = BootOption.getHasSlach(bootOption);
        bootOption.type = clientScript ? define_1.default.APP_TYPES.PORTAL : define_1.default.APP_TYPES.EXTENSION;
        delete bootOption.src;
        delete bootOption.async;
        return bootOption;
    }
    static getHasSlach(bootOption) {
        if (bootOption.href) {
            const ch = bootOption.href.replace("https:/", "").replace("http:/", "");
            return ch.lastIndexOf("/") === ch.length - 1;
        }
        else {
            return bootOption.hasslash ? Schema_1.default.getBool(bootOption.hasslash) : false;
        }
    }
}
class CoreAPI {
    constructor(apiStore, resolve) {
        const wsServer = location.host.indexOf(define_1.default.PRODUCTION_DOMAIN) >= 0 ? define_1.default.PRODUCTION_DOMAIN : define_1.default.DEVELOPMENT_DOMAIN;
        this.apiStore = apiStore;
        this.ws = socket_io_client_1.default(`https://${wsServer}:${define_1.default.PORTS.SOCKET_IO}`, { forceNew: true });
        this.onResponseMeAPI(resolve);
        this.setUp = this.setUp.bind(this);
    }
    setUp(state, ch) {
        this.state = state;
        this.ch = ch;
        this.onResponseChAPI();
        this.onRequestAPI();
    }
    onRequestAPI() {
        const actions = clientToServerEmit_1.default;
        const actionKeys = Object.keys(actions);
        const actionLength = actionKeys.length;
        const getCoreAPI = (actionName, beforeFunction) => {
            return (requestParams1, requestParams2) => {
                const reduxState = this.apiStore.getState();
                const _requestState = Sequence_1.default.getRequestState(actionName, reduxState, requestParams1);
                const _actionState = Sequence_1.default.getRequestActionState(actionName, requestParams1, requestParams2);
                const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
                this.ws.emit(requestState.type, requestState);
                return this.apiStore.dispatch(actionState);
            };
        };
        for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
            const actionName = actionKeys[actionNodeCnt];
            const actionPlainName = actionName.replace(Sequence_1.default.CLIENT_TO_SERVER_EMIT, "");
            const beforeFunction = actions[actionName];
            this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
        }
    }
    onResponseMeAPI(resolve = null) {
        const getToMeAPI = (action, resolve = null) => {
            const self = this;
            return response => {
                if (resolve && response.type === Sequence_1.default.CONNECTION_SERVER_KEY) {
                    resolve(self);
                }
                const actionState = action(response);
                return this.apiStore.dispatch(actionState);
            };
        };
        const callback = getToMeAPI(serverToClientEmit_1.default, resolve);
        this.on(Sequence_1.default.CATCH_ME_KEY, callback);
    }
    onResponseChAPI(ch = this.ch) {
        const getResponseChAPI = actionMethod => {
            return response => {
                const actionState = actionMethod(response);
                return this.apiStore.dispatch(actionState);
            };
        };
        const callback = getResponseChAPI(serverToClientBradcast_1.default);
        this.on(ch, callback);
    }
    offResponseChAPI(ch = this.ch) {
        this.off(ch);
    }
    on(onKey, callback = () => { }) {
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
    constructor() {
        this.apiStore = apiStore_1.default();
        this.bootOption = new BootOption();
        this.exeCoreApi = this.exeCoreApi.bind(this);
        this.exeAction = this.exeAction.bind(this);
        this.appTo = this.appTo.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.onWsServer = this.onWsServer.bind(this);
        this.apiStore.subscribe(this.subscribe);
        this.onActions();
        const bootPromises = [];
        const self = this;
        bootPromises.push(new Promise(onMessageResolve => {
            window.onmessage = e => {
                if (onMessageResolve) {
                    self.origin = e.origin;
                    onMessageResolve();
                }
                if (e.data.type === Message_1.default.appToCoreApi) {
                    if (e.data.method === Message_1.default.connectionMethod) {
                        clearInterval(self.bootId);
                    }
                    else {
                        self.exeCoreApi(e);
                    }
                }
                else if (e.data.type === Message_1.default.appToAction) {
                    self.exeAction(e);
                }
            };
        }));
        bootPromises.push(new Promise(resove => {
            if (document.readyState === "complete") {
                new CoreAPI(self.apiStore, resove);
            }
            else {
                window.onload = e => {
                    new CoreAPI(self.apiStore, resove);
                };
            }
        }).then(this.onWsServer));
        Promise.all(bootPromises).then((bootParams) => {
            this.bootId = setInterval(() => {
                this.appTo(Message_1.default.connectionMethod, this.bootOption);
            }, 200);
        });
    }
    static getRequestObj(method, params = {}) {
        const href = location.href;
        return {
            type: Message_1.default.coreApiToApp,
            href,
            method: method,
            params: params
        };
    }
    exeCoreApi(e) {
        if (this[e.data.method]) {
            this[e.data.method](e.data.params1, e.data.params2);
        }
        else if (this.coreApi && this.coreApi[e.data.method]) {
            const { params1, params2 } = e.data;
            if (params1 && params2) {
                this.coreApi[e.data.method](params1, params2);
            }
            else if (params1) {
                this.coreApi[e.data.method](params1);
            }
            else {
                this.coreApi[e.data.method]();
            }
        }
    }
    exeAction(e) {
        if (this[e.data.method]) {
            this[e.data.method](e.data.params1, e.data.params2);
        }
    }
    onWsServer(coreApi) {
        this.coreApi = coreApi;
        const state = new store_1.default(window, this.bootOption);
        this.coreApi.setUp(state, this.bootOption.ch);
        this.coreApi.tuned(state);
        window.$t = new public_api_1.default(this.coreApi);
    }
    onActions() {
        const actionKeys = Object.keys(handles_1.default);
        const actionLength = actionKeys.length;
        const getActions = actionName => {
            return (params1, params2) => {
                const action = handles_1.default[actionName](params1);
                const reduxState = this.apiStore.getState();
                return this.apiStore.dispatch(action);
            };
        };
        for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
            const actionName = actionKeys[actionNodeCnt];
            this[actionName] = getActions(actionName);
        }
    }
    subscribe() {
        const state = this.apiStore.getState();
        if (state.app.actioned === "ON_SCROLL_UPDATE_TIME_MARKER") {
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
//# sourceMappingURL=talkn.api.js.map