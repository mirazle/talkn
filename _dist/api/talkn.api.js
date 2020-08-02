"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const conf_1 = __importDefault(require("common/conf"));
const PostMessage_1 = __importDefault(require("common/PostMessage"));
const define_1 = __importDefault(require("common/define"));
const store_1 = __importDefault(require("api/store/"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const apiStore_1 = __importDefault(require("api/store/apiStore"));
const serverToApiEmit_1 = __importDefault(require("api/actions/ws/serverToApiEmit"));
const apiToServerRequest_1 = __importDefault(require("api/actions/ws/apiToServerRequest"));
const serverToApiBradcast_1 = __importDefault(require("api/actions/ws/serverToApiBradcast"));
class Ws {
    constructor(webWorker) {
        this.callbacks = {};
        this.connect = this.connect.bind(this);
        this.setUp = this.setUp.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.onResponseMeAPI = this.onResponseMeAPI.bind(this);
        this.offResponseChAPI = this.offResponseChAPI.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.exeCallback = this.exeCallback.bind(this);
        this.store = apiStore_1.default();
        this.store.subscribe(this.subscribe);
        this.webWorker = webWorker;
        this.io = socket_io_client_1.default(`${Sequence_1.default.HTTPS_PROTOCOL}//${Ws.server}:${define_1.default.PORTS.SOCKET_IO}`, { forceNew: true });
        this.io.on("connect", this.connect);
        this.onRequestAPI();
        this.onResponseMeAPI();
    }
    static get server() {
        return conf_1.default.env === define_1.default.DEVELOPMENT || conf_1.default.env === define_1.default.LOCALHOST
            ? define_1.default.DEVELOPMENT_DOMAIN
            : define_1.default.PRODUCTION_DOMAIN;
    }
    connect() {
        this.webWorker.postMessage("GET_BOOT_OPTION", {}, "setUp");
    }
    setUp(bootOption) {
        const apiState = new store_1.default(bootOption);
        this.store.dispatch({ ...apiState, type: "SETUP_API_STORE" });
        this.onResponseChAPI(bootOption.ch);
    }
    onRequestAPI() {
        const actions = apiToServerRequest_1.default;
        const actionKeys = Object.keys(actions);
        const actionLength = actionKeys.length;
        const getCoreAPI = (actionName, beforeFunction) => {
            return (requestParams, callback = () => { }) => {
                const reduxState = this.store.getState();
                const _requestState = Sequence_1.default.getRequestState(actionName, reduxState, requestParams);
                const _actionState = Sequence_1.default.getRequestActionState(actionName, requestParams);
                const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
                this.callbacks[requestState.type] = callback;
                this.io.emit(requestState.type, requestState);
                return this.store.dispatch(actionState);
            };
        };
        for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
            const actionName = actionKeys[actionNodeCnt];
            const actionPlainName = actionName.replace(Sequence_1.default.API_TO_SERVER_REQUEST, "");
            const beforeFunction = actions[actionName];
            this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
        }
    }
    onResponseMeAPI() {
        const getToMeAPI = (action) => {
            return (response) => {
                const actionState = action(response);
                this.store.dispatch(actionState);
            };
        };
        const callback = getToMeAPI(serverToApiEmit_1.default);
        this.on(Sequence_1.default.CATCH_ME_KEY, callback);
    }
    onResponseChAPI(ch) {
        const getResponseChAPI = (actionMethod) => {
            return (response) => {
                const actionState = actionMethod(response);
                this.store.dispatch(actionState);
            };
        };
        const callback = getResponseChAPI(serverToApiBradcast_1.default);
        this.on(ch, callback);
    }
    offResponseChAPI(ch) {
        this.off(ch);
    }
    on(onKey, callback = () => { }) {
        if (!this.io._callbacks[`$${onKey}`]) {
            this.io.on(onKey, callback);
        }
    }
    off(offKey) {
        if (this.ws._callbacks[`$${offKey}`]) {
            this.io.off(offKey);
        }
    }
    subscribe() {
        const apiState = this.store.getState();
        this.exeCallback(apiState.app.actioned, apiState);
        this.webWorker.postMessage(apiState.app.actioned, apiState);
    }
    exeCallback(method, apiState) {
        const { actionType, actionName } = Sequence_1.default.getSequenceActionMap(method);
        if (actionName !== Sequence_1.default.API_BROADCAST_CALLBACK) {
            if (actionType === Sequence_1.default.API_RESPONSE_TYPE_EMIT) {
                if (this.callbacks[actionName]) {
                    const { posts, thread, user } = apiState;
                    this.callbacks[actionName](apiState, { posts, thread, uid: user.uid });
                }
            }
        }
        if (actionType === Sequence_1.default.API_RESPONSE_TYPE_BROADCAST) {
            if (this.callbacks[Sequence_1.default.API_BROADCAST_CALLBACK]) {
                const { posts, thread, user } = apiState;
                this.callbacks[Sequence_1.default.API_BROADCAST_CALLBACK](actionName, { posts, thread, uid: user.uid });
            }
        }
    }
}
class WebWorker {
    constructor(worker) {
        this.onMessage = this.onMessage.bind(this);
        this.onMessageError = this.onMessageError.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.worker = worker;
        this.worker.onerror = this.onMessageError;
        this.worker.onmessage = this.onMessage;
        this.ws = new Ws(this);
    }
    postMessage(method, params = {}, methodBack) {
        const message = {
            id: this.id,
            type: PostMessage_1.default.CLIENT_TO_WSAPI_TYPE,
            method: method,
            params,
            methodBack,
        };
        this.worker.postMessage(message);
    }
    onMessage(e) {
        const { method, params } = e.data;
        if (this.ws[method] && typeof this.ws[method] === "function") {
            this.ws[method](params);
        }
    }
    onMessageError(e) {
        console.warn(e);
    }
}
exports.default = WebWorker;
new WebWorker(self);
//# sourceMappingURL=talkn.api.js.map