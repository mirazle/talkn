"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
const PostMessage_1 = __importDefault(require("common/PostMessage"));
const store_1 = __importDefault(require("api/store/"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const public_api_1 = __importDefault(require("api/public.api"));
const apiStore_1 = __importDefault(require("api/store/apiStore"));
const handles_1 = __importDefault(require("client/actions/handles"));
const serverToApiEmit_1 = __importDefault(require("api/actions/ws/serverToApiEmit"));
const apiToServerRequest_1 = __importDefault(require("api/actions/ws/apiToServerRequest"));
const serverToApiBradcast_1 = __importDefault(require("api/actions/ws/serverToApiBradcast"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const clientUtil_1 = __importDefault(require("client/container/util/clientUtil"));
const PostsTimeline_1 = __importDefault(require("./store/PostsTimeline"));
const PostsTimelineStock_1 = __importDefault(require("./store/PostsTimelineStock"));
class BootOption {
    constructor() {
        const { env, apiScript } = BootOption.getEnvAndApiScript();
        const extScript = BootOption.getExtScript(env);
        const clientScript = BootOption.getClientScript(env);
        const apiScriptAtt = apiScript ? BootOption.rebuildAttributes(apiScript.attributes) : {};
        const extScriptAtt = extScript ? BootOption.rebuildAttributes(extScript.attributes) : {};
        const clientScriptAtt = clientScript ? BootOption.rebuildAttributes(clientScript.attributes) : {};
        const bootAttributes = BootOption.getBootAttributes(apiScriptAtt, extScriptAtt);
        const bootOption = BootOption.initialBootOption(env, bootAttributes, clientScript, extScript);
        return bootOption;
    }
    static getEnvAndApiScript() {
        const { SUB_DOMAINS, PORTS, talknApiJs } = define_1.default;
        const prodApiSrc1 = `${Sequence_1.default.HTTPS_PROTOCOL}//${SUB_DOMAINS.API}.${define_1.default.PRODUCTION_DOMAIN}/v${conf_1.default.apiVer}`;
        const prodApiScript1 = window.top.document.querySelector(`script[src='${prodApiSrc1}']`);
        if (prodApiScript1)
            return { env: define_1.default.PRODUCTION, apiScript: prodApiScript1 };
        const prodApiSrc2 = `//${SUB_DOMAINS.API}.${define_1.default.PRODUCTION_DOMAIN}/v${conf_1.default.apiVer}`;
        const prodApiScript2 = window.top.document.querySelector(`script[src='${prodApiSrc2}']`);
        if (prodApiScript2)
            return { env: define_1.default.PRODUCTION, apiScript: prodApiScript2 };
        const localApiSrc1 = `${Sequence_1.default.HTTPS_PROTOCOL}//${SUB_DOMAINS.API}.${define_1.default.DEVELOPMENT_DOMAIN}/v${conf_1.default.apiVer}`;
        const localApiScript1 = window.top.document.querySelector(`script[src='${localApiSrc1}']`);
        if (localApiScript1)
            return { env: define_1.default.LOCALHOST, apiScript: localApiScript1 };
        const localApiSrc2 = `//${SUB_DOMAINS.API}.${define_1.default.DEVELOPMENT_DOMAIN}/v${conf_1.default.apiVer}`;
        const localApiScript2 = window.top.document.querySelector(`script[src='${localApiSrc2}']`);
        if (localApiScript2)
            return { env: define_1.default.LOCALHOST, apiScript: localApiScript2 };
        const devApiSrc1 = `${Sequence_1.default.HTTPS_PROTOCOL}//${define_1.default.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT_API}/${talknApiJs}`;
        const devApiScript1 = window.top.document.querySelector(`script[src='${devApiSrc1}']`);
        if (devApiScript1)
            return { env: define_1.default.DEVELOPMENT, apiScript: devApiScript1 };
        const devApiSrc2 = `//${define_1.default.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT_API}/${talknApiJs}`;
        const devApiScript2 = window.top.document.querySelector(`script[src='${devApiSrc2}']`);
        if (devApiScript2)
            return { env: define_1.default.DEVELOPMENT, apiScript: devApiScript2 };
        throw "NO EXIST API SCRIPT.";
    }
    static getClientScript(env) {
        const { SUB_DOMAINS, PORTS, talknClientJs } = define_1.default;
        let clientSrc;
        switch (env) {
            case define_1.default.PRODUCTION:
                clientSrc = `${Sequence_1.default.HTTPS_PROTOCOL}//${SUB_DOMAINS.CLIENT}.${define_1.default.PRODUCTION_DOMAIN}`;
                break;
            case define_1.default.LOCALHOST:
                clientSrc = `${Sequence_1.default.HTTPS_PROTOCOL}//${SUB_DOMAINS.CLIENT}.${define_1.default.DEVELOPMENT_DOMAIN}`;
                break;
            case define_1.default.DEVELOPMENT:
                clientSrc = `${Sequence_1.default.HTTPS_PROTOCOL}//${define_1.default.DEVELOPMENT_DOMAIN}:${PORTS.DEVELOPMENT}/${talknClientJs}`;
                break;
        }
        const clientScript = window.top.document.querySelector(`script[src='${clientSrc}']`);
        return clientScript ? clientScript : undefined;
    }
    static getExtScript(env) {
        const { SUB_DOMAINS } = define_1.default;
        switch (env) {
            case define_1.default.PRODUCTION:
                const prodExtSrc1 = `${Sequence_1.default.HTTPS_PROTOCOL}//${SUB_DOMAINS.EXT}.${define_1.default.PRODUCTION_DOMAIN}`;
                const prodExtScript1 = window.top.document.querySelector(`script[src='${prodExtSrc1}']`);
                if (prodExtScript1)
                    return prodExtScript1;
                const prodExtSrc2 = `//${SUB_DOMAINS.EXT}.${define_1.default.PRODUCTION_DOMAIN}`;
                const prodExtScript2 = window.top.document.querySelector(`script[src='${prodExtSrc2}']`);
                if (prodExtScript2)
                    return prodExtScript2;
                break;
            case define_1.default.LOCALHOST:
            case define_1.default.DEVELOPMENT:
                const devExtSrc1 = `${Sequence_1.default.HTTPS_PROTOCOL}://${SUB_DOMAINS.EXT}.${define_1.default.DEVELOPMENT_DOMAIN}`;
                const devExtScript1 = window.top.document.querySelector(`script[src='${devExtSrc1}']`);
                if (devExtScript1)
                    return devExtScript1;
                const devExtSrc2 = `//${SUB_DOMAINS.EXT}.${define_1.default.DEVELOPMENT_DOMAIN}`;
                const devExtScript2 = window.top.document.querySelector(`script[src='${devExtSrc2}']`);
                if (devExtScript2)
                    return devExtScript2;
                break;
        }
        return undefined;
    }
    static rebuildAttributes(attributes) {
        let rebuildAttributesObj = {};
        Object.keys(attributes).forEach((i) => {
            rebuildAttributesObj[attributes[i].name] = attributes[i].value;
        });
        return rebuildAttributesObj;
    }
    static getBootAttributes(apiScriptAtt, extScriptAtt) {
        return extScriptAtt ? { ...apiScriptAtt, ...extScriptAtt } : { ...apiScriptAtt };
    }
    static getInitialRootCh(env, bootAttributes) {
        let initialRootCh = bootAttributes && bootAttributes.ch ? bootAttributes.ch : location.href;
        initialRootCh = initialRootCh.replace(`${Sequence_1.default.HTTPS_PROTOCOL}/`, "").replace(`${Sequence_1.default.HTTP_PROTOCOL}/`, "");
        switch (env) {
            case define_1.default.PRODUCTION:
                initialRootCh = initialRootCh.replace(`/${define_1.default.PRODUCTION_DOMAIN}`, "/");
                break;
            case define_1.default.LOCALHOST:
                initialRootCh = initialRootCh.replace(`/${define_1.default.DEVELOPMENT_DOMAIN}`, "/");
                break;
            case define_1.default.DEVELOPMENT:
                initialRootCh = initialRootCh
                    .replace(`:${define_1.default.PORTS.DEVELOPMENT}`, "")
                    .replace(`:${define_1.default.PORTS.DEVELOPMENT_API}`, "");
                if (initialRootCh.indexOf(`/${define_1.default.DEVELOPMENT_DOMAIN}/`) === 0) {
                    initialRootCh = "/";
                }
                break;
        }
        return initialRootCh;
    }
    static getType(extScript, clientScript) {
        let type = define_1.default.APP_TYPES.API;
        if (extScript)
            return define_1.default.APP_TYPES.EXTENSION;
        if (clientScript)
            return define_1.default.APP_TYPES.PORTAL;
        return type;
    }
    static getProtocol() {
        if (location.protocol === Sequence_1.default.HTTPS_PROTOCOL)
            return Sequence_1.default.HTTPS_PROTOCOL;
        if (location.protocol === Sequence_1.default.HTTP_PROTOCOL)
            return Sequence_1.default.HTTP_PROTOCOL;
        return Sequence_1.default.TALKN_PROTOCOL;
    }
    static getFirstHasSlach(ch) {
        return ch.indexOf("/") === 0;
    }
    static getLastHasSlach(ch) {
        return ch.lastIndexOf("/") === ch.length - 1;
    }
    static getCh(initialRootCh, firstHasSlash, lastHasSlash) {
        let ch = initialRootCh;
        ch = firstHasSlash ? ch : `/${ch}`;
        ch = lastHasSlash ? ch : `${ch}/`;
        ch = ch.replace(/^\/\//, "/");
        return ch;
    }
    static initialBootOption(env, bootAttributes, clientScript, extScript) {
        const type = BootOption.getType(extScript, clientScript);
        const initialRootCh = BootOption.getInitialRootCh(env, bootAttributes);
        const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
        const lastHasSlash = BootOption.getLastHasSlach(initialRootCh);
        const ch = BootOption.getCh(initialRootCh, firstHasSlash, lastHasSlash);
        const protocol = BootOption.getProtocol();
        const host = location.host;
        return {
            env,
            type,
            ch,
            hasSlash: lastHasSlash,
            protocol,
            host,
        };
    }
}
class CoreAPI {
    constructor(env, apiStore, resolve) {
        this.callbacks = {};
        const wsServer = env === define_1.default.DEVELOPMENT || env === define_1.default.LOCALHOST ? define_1.default.DEVELOPMENT_DOMAIN : define_1.default.PRODUCTION_DOMAIN;
        this.apiStore = apiStore;
        this.ws = socket_io_client_1.default(`${Sequence_1.default.HTTPS_PROTOCOL}//${wsServer}:${define_1.default.PORTS.SOCKET_IO}`, { forceNew: true });
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
        const actions = apiToServerRequest_1.default;
        const actionKeys = Object.keys(actions);
        const actionLength = actionKeys.length;
        const getCoreAPI = (actionName, beforeFunction) => {
            return (requestParams, callback = () => { }) => {
                const reduxState = this.apiStore.getState();
                const _requestState = Sequence_1.default.getRequestState(actionName, reduxState, requestParams);
                const _actionState = Sequence_1.default.getRequestActionState(actionName, requestParams);
                const { requestState, actionState } = beforeFunction(reduxState, _requestState, _actionState);
                this.callbacks[requestState.type] = callback;
                this.ws.emit(requestState.type, requestState);
                return this.apiStore.dispatch(actionState);
            };
        };
        for (let actionNodeCnt = 0; actionNodeCnt < actionLength; actionNodeCnt++) {
            const actionName = actionKeys[actionNodeCnt];
            const actionPlainName = actionName.replace(Sequence_1.default.API_TO_SERVER_REQUEST, "");
            const beforeFunction = actions[actionName];
            this[actionPlainName] = getCoreAPI(actionName, beforeFunction);
        }
    }
    onResponseMeAPI(resolve = null) {
        const getToMeAPI = (action, resolve = null) => {
            const self = this;
            return (response) => {
                if (resolve && response.type === Sequence_1.default.CONNECTION_SERVER_KEY) {
                    resolve(self);
                }
                const actionState = action(response);
                return this.apiStore.dispatch(actionState);
            };
        };
        const callback = getToMeAPI(serverToApiEmit_1.default, resolve);
        this.on(Sequence_1.default.CATCH_ME_KEY, callback);
    }
    onResponseChAPI(ch = this.ch) {
        const getResponseChAPI = (actionMethod) => {
            return (response) => {
                const actionState = actionMethod(response);
                return this.apiStore.dispatch(actionState);
            };
        };
        const callback = getResponseChAPI(serverToApiBradcast_1.default);
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
        this.clientTo = this.clientTo.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.onWsServer = this.onWsServer.bind(this);
        this.exeCallback = this.exeCallback.bind(this);
        this.afterMediaFilter = this.afterMediaFilter.bind(this);
        this.apiStore.subscribe(this.subscribe);
        this.iframes = {};
        this.onActions();
        const bootPromises = [];
        const self = this;
        bootPromises.push(new Promise((onMessageResolve) => {
            window.onmessage = (e) => {
                if (onMessageResolve) {
                    self.origin = e.origin;
                    onMessageResolve();
                }
                switch (e.data.type) {
                    case PostMessage_1.default.CLIENT_TO_API_TYPE:
                        if (e.data.method === PostMessage_1.default.HANDLE_API_AND_CLIENT) {
                            clearInterval(self.bootId);
                        }
                        else {
                            self.exeCoreApi(e);
                        }
                        break;
                    case PostMessage_1.default.EXT_TO_API_TYPE:
                        if (e.data.method === PostMessage_1.default.HANDLE_EXT_AND_API) {
                        }
                        self.exeCoreApi(e);
                        break;
                }
            };
        }));
        bootPromises.push(new Promise((resove) => {
            if (window.top.document.readyState === "complete") {
                new CoreAPI(this.bootOption.env, self.apiStore, resove);
            }
            else {
                window.onload = (e) => {
                    new CoreAPI(this.bootOption.env, self.apiStore, resove);
                };
            }
        }).then(this.onWsServer));
        Promise.all(bootPromises).then((bootParams) => {
            this.bootId = setInterval(() => {
                this.clientTo("talknModal", PostMessage_1.default.HANDLE_API_AND_CLIENT, this.bootOption);
            }, 200);
        });
    }
    static getClientToRequestObj(method, params = {}) {
        const href = window.top.location.href;
        return {
            type: PostMessage_1.default.API_TO_CLIENT_TYPE,
            method: method,
            params: params,
            href,
        };
    }
    exeCoreApi(e) {
        if (this.coreApi && this.coreApi[e.data.method]) {
            const { method, params } = e.data;
            const apiState = this.apiStore.getState();
            this.beforeMediaFilter({ method, params, apiState });
            this.coreApi[method](params);
        }
    }
    onWsServer(coreApi) {
        this.coreApi = coreApi;
        const apiState = new store_1.default(window, this.bootOption);
        this.coreApi.setUp(apiState, this.bootOption.ch);
        if (this.bootOption.type !== define_1.default.APP_TYPES.API) {
            this.coreApi.tune(apiState);
        }
        window.$t = new public_api_1.default(this.coreApi);
    }
    onActions() {
        const actionKeys = Object.keys(handles_1.default);
        const actionLength = actionKeys.length;
        const getActions = (actionName) => {
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
        if (this.coreApi) {
            const apiState = this.apiStore.getState();
            this.afterMediaFilter(apiState);
            this.exeCallback(apiState.app.actioned, apiState);
            this.clientTo("talknModal", apiState.app.actioned, apiState);
        }
    }
    exeCallback(method, apiState) {
        const { actionType, actionName } = Sequence_1.default.getSequenceActionMap(method);
        if (actionName !== Sequence_1.default.API_BROADCAST_CALLBACK) {
            if (actionType === Sequence_1.default.API_RESPONSE_TYPE_EMIT) {
                if (this.coreApi.callbacks[actionName]) {
                    const { posts, thread, user } = apiState;
                    this.coreApi.callbacks[actionName](apiState, { posts, thread, uid: user.uid });
                }
            }
        }
        if (actionType === Sequence_1.default.API_RESPONSE_TYPE_BROADCAST) {
            if (this.coreApi.callbacks[Sequence_1.default.API_BROADCAST_CALLBACK]) {
                const { posts, thread, user } = apiState;
                this.coreApi.callbacks[Sequence_1.default.API_BROADCAST_CALLBACK](actionName, { posts, thread, uid: user.uid });
            }
        }
    }
    beforeMediaFilter({ method, params, apiState }) {
        if (apiState.app.isMediaCh) {
            if (method === "post") {
                params.app.inputCurrentTime = this.media.currentTime > 0 ? this.media.currentTime : 0;
            }
        }
        return params;
    }
    afterMediaFilter(apiState) {
        switch (apiState.app.actioned) {
            case "SERVER_TO_API[EMIT]:fetchPosts":
                if (apiState.app.isMediaCh) {
                    if (this.media && this.media.status === "finding" && this.media.ch === apiState.thread.ch) {
                        this.media.setPostsTimelines(apiState);
                        this.media.playing();
                    }
                    else {
                        this.media = new Media(this);
                        this.media.searching();
                    }
                }
                else {
                    this.media = new Media(this);
                    this.media.searching();
                }
                break;
            case "SERVER_TO_API[BROADCAST]:post":
                if (apiState.app.isMediaCh) {
                    const post = apiState.posts[0];
                    if (post.ch === this.media.ch) {
                        if (post.uid === apiState.user.uid) {
                            this.media.refrectSelfPost(post);
                        }
                    }
                }
                break;
        }
    }
    clientTo(id = "talknModel", method, params = {}) {
        switch (this.bootOption.type) {
            case define_1.default.APP_TYPES.PORTAL:
                const requestObj = GlobalWindow.getClientToRequestObj(method, params);
                window.top.postMessage(requestObj, location.href);
                break;
            case define_1.default.APP_TYPES.EXTENSION:
                const modalIframe = window.top.document.querySelector(`iframe#${id}`);
                if (modalIframe) {
                    const requestObj = GlobalWindow.getClientToRequestObj(method, params);
                    modalIframe.contentWindow.postMessage(requestObj, modalIframe.src);
                }
                else {
                    throw "NO EXTENSION IFRAME";
                }
                break;
            case define_1.default.APP_TYPES.API:
                break;
        }
    }
}
class Iframe {
    constructor() { }
}
class Media {
    constructor(globalWindow) {
        this.maxSearchingCnt = 30;
        this.status = "shutdown";
        this.isLog = false;
        this.globalWindow = globalWindow;
        this.ch = globalWindow.apiStore.getState().thread.ch;
        this.searchingCnt = 0;
        this.playingCnt = 0;
        this.pointerTime = 0;
        this.started = false;
        this.isPosting = false;
        clearInterval(this.searchingId);
        clearInterval(this.playIntervalId);
        this.postsTimeline = [];
        this.postsTimelineStock = [];
        this.setPostsTimelines = this.setPostsTimelines.bind(this);
        this.refrectSelfPost = this.refrectSelfPost.bind(this);
        this.searching = this.searching.bind(this);
        this.handleEvents = this.handleEvents.bind(this);
        this.posting = this.posting.bind(this);
        this.apiTo = this.apiTo.bind(this);
        this.log = this.log.bind(this);
    }
    static get mediaSecondInterval() {
        return 200;
    }
    static getMedia(thread) {
        const src = Thread_1.default.getMediaSrc(thread);
        const tagType = Thread_1.default.getMediaTagType(thread);
        return window.top.document.querySelector(`${tagType}[src='${src}']`);
    }
    static getClientToRequestObj(method, params = {}) {
        return {
            type: PostMessage_1.default.MEDIA_TO_CLIENT_TYPE,
            method: method,
            params: params,
        };
    }
    setStatus(status) {
        this.status = status;
        this.log("SET STATUS");
    }
    setPostsTimelines({ postsTimeline, postsTimelineStock }) {
        this.postsTimeline = [...postsTimeline];
        this.postsTimelineStock = [...postsTimelineStock];
        this.log("INIT TIMELINES");
    }
    refrectSelfPost(post) {
        const length = this.postsTimeline.length;
        let pushFlg = false;
        for (let i = 0; i < length; i++) {
            if (post.currentTime < this.postsTimeline[i].currentTime) {
                pushFlg = true;
                this.postsTimeline.splice(i, 0, post);
            }
        }
        if (!pushFlg) {
            this.postsTimeline.push(post);
        }
    }
    get currentTime() {
        return this.file ? Math.floor(this.file.currentTime * 10) / 10 : 0;
    }
    searching(second = Media.mediaSecondInterval) {
        this.setStatus("searching");
        this.searchingCnt = 0;
        this.searchingId = null;
        this.waitingId = null;
        this.playIntervalId = null;
        this.searchingId = setInterval(() => {
            if (this.searchingCnt < this.maxSearchingCnt) {
                const videos = window.top.document.querySelectorAll("video");
                const audios = window.top.document.querySelectorAll("audio");
                videos.forEach(this.handleEvents);
                audios.forEach(this.handleEvents);
                if (videos.length > 0 || audios.length > 0) {
                    this.setStatus("waiting");
                    clearInterval(this.searchingId);
                    clearInterval(this.playIntervalId);
                }
                else {
                    this.searchingCnt++;
                }
            }
            else {
                clearInterval(this.searchingId);
                clearInterval(this.playIntervalId);
                this.searching(Media.mediaSecondInterval * 10);
            }
        }, second);
    }
    handleEvents(media) {
        media.addEventListener("play", (e) => {
            this.file = e.srcElement;
            const mediaCh = clientUtil_1.default.deleteProtcol(this.file.currentSrc) + "/";
            if (this.ch === mediaCh) {
                if (this.playingCnt === 0) {
                    this.setPostsTimelines(this.globalWindow.apiStore.getState());
                }
                this.playing();
            }
            else {
                this.setStatus("finding");
                this.ch = mediaCh;
                this.globalWindow.coreApi.onResponseChAPI(this.ch);
                this.globalWindow.coreApi.changeThread({ thread: { ch: this.ch } });
            }
        });
        media.addEventListener("seeked", (e) => {
            this.setStatus("seeking");
        });
        media.addEventListener("pause", (e) => {
            this.setStatus("waiting");
        });
        media.addEventListener("ended", (e) => {
            this.setStatus("waiting");
            clearInterval(this.playIntervalId);
            const currentTime = Number.MAX_SAFE_INTEGER;
            const length = this.postsTimelineStock.length;
            for (let i = 0; i < length; i++) {
                if (this.postsTimelineStock[i] && this.postsTimelineStock[i].currentTime <= currentTime) {
                    this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [this.postsTimelineStock[i]] });
                }
                else {
                    break;
                }
            }
            this.setStatus("waiting");
        });
    }
    playing() {
        this.setStatus("playing");
        clearInterval(this.playIntervalId);
        this.playIntervalId = setInterval(() => {
            this.posting(this.currentTime);
        }, conf_1.default.mediaSecondInterval);
    }
    posting(pointerTime = 0) {
        if (this.isPosting)
            return;
        const timelineLength = this.postsTimelineStock.length;
        this.playingCnt++;
        this.isPosting = true;
        if (this.pointerTime <= pointerTime) {
            this.pointerTime = pointerTime;
            while (this.isPosting) {
                if (timelineLength === 0) {
                    this.isPosting = false;
                }
                else if (this.postsTimelineStock[0] && this.postsTimelineStock[0].currentTime <= pointerTime) {
                    const addPost = this.postsTimelineStock.shift();
                    this.apiTo("NEXT_POSTS_TIMELINE", { postsTimeline: [addPost] });
                    this.log("POSTING");
                }
                else {
                    this.isPosting = false;
                    break;
                }
            }
        }
        else {
            this.file.pause();
            const postsTimelineAll = this.globalWindow.apiStore.getState().postsTimeline.concat(this.postsTimelineStock);
            const length = postsTimelineAll.length;
            this.pointerTime = this.currentTime;
            this.postsTimeline = new PostsTimeline_1.default();
            this.postsTimelineStock = new PostsTimelineStock_1.default();
            for (let i = 0; i < length; i++) {
                const post = postsTimelineAll[i];
                if (post.currentTime <= this.pointerTime) {
                    this.postsTimeline.push(post);
                }
                else {
                    this.postsTimelineStock.push(post);
                }
            }
            this.apiTo("CLEAR_POSTS_TIMELINE", {
                postsTimeline: this.postsTimeline,
                postsTimelineStock: this.postsTimelineStock,
            });
            this.isPosting = false;
            this.file.play();
        }
    }
    apiTo(method, params = {}) {
        this.globalWindow.apiStore.dispatch({ type: method, ...params });
    }
    log(label, isForce = false) {
        if (this.isLog || isForce) {
            console.log(`@@@@@@@@@@@ ${label} ${this.status} CH ${this.ch} ${this.pointerTime} @@@`);
            console.log(`postsTimeline: ${this.postsTimeline.length} postsTimelineStock: ${this.postsTimelineStock.length}`);
            console.log(this.postsTimeline);
            console.log(this.postsTimelineStock);
        }
    }
}
exports.Media = Media;
const globalWindow = new GlobalWindow();
//# sourceMappingURL=_talkn.api.js.map