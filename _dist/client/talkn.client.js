"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_api_worker_1 = __importDefault(require("worker-loader?publicPath=/&name=worker.js!./ws.api.worker"));
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
const BootOption_1 = __importDefault(require("common/BootOption"));
const Media_1 = __importDefault(require("common/Media"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const App_1 = __importDefault(require("api/store/App"));
const PostMessage_1 = __importDefault(require("common/PostMessage"));
const TalknSetup_1 = __importDefault(require("client/operations/TalknSetup"));
const clientStore_1 = __importDefault(require("client/store/clientStore"));
const store_1 = __importDefault(require("client/store/"));
const store_2 = __importDefault(require("api/store/"));
const App_2 = __importDefault(require("client/App"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const UiTimeMarker_1 = __importDefault(require("client/store/UiTimeMarker"));
class Window {
    constructor() {
        this.id = define_1.default.APP_TYPES.PORTAL;
        this.store = clientStore_1.default();
        this.parentHref = location.href;
        TalknSetup_1.default.setupMath();
        this.bootOption = new BootOption_1.default(this.id);
        const apiState = new store_2.default(this.bootOption);
        const clientState = new store_1.default(apiState);
        const state = { ...apiState, ...clientState };
        this.store.dispatch({ ...state, type: "INIT_CLIENT" });
        this.api = this.api.bind(this);
        this.injectStateToApp = this.injectStateToApp.bind(this);
        this.postMessage = this.postMessage.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onError = this.onError.bind(this);
        this.beforeMedia = this.beforeMedia.bind(this);
        this.afterMedia = this.afterMedia.bind(this);
        this.wsApi = new ws_api_worker_1.default();
        this.wsApi.onerror = this.onError;
        this.wsApi.onmessage = this.onMessage;
        this.ext = new Ext(this);
        this.dom = new Dom(this);
        console.log(this.wsApi);
        this.media = new Media_1.default();
        this.media.searching();
    }
    api(method, params = {}) {
        this.postMessage(method, params);
    }
    injectStateToApp(apiState) {
        this.api("tune", apiState);
        this.api("fetchPosts", apiState);
        this.api("rank", apiState);
    }
    postMessage(method, params = {}) {
        const message = {
            id: this.id,
            type: PostMessage_1.default.CLIENT_TO_WSAPI_TYPE,
            method,
            params,
        };
        this.wsApi.postMessage(message);
    }
    onMessage(e) {
        const { currentTarget, data } = e;
        if (currentTarget instanceof Worker) {
            const { type, method, params, methodBack } = data;
            if (type === PostMessage_1.default.WSAPI_TO_CLIENT_TYPE) {
                const actionType = PostMessage_1.default.convertApiToClientActionType(method);
                this.store.dispatch({ ...params, type: actionType });
                if (WsApiResponseCallbacks[method] && typeof WsApiResponseCallbacks[method] === "function") {
                    const backParams = WsApiResponseCallbacks[method](this, params);
                    if (methodBack) {
                        this.postMessage(methodBack, backParams);
                    }
                }
                if (method === `SETUPED_API_STORE`) {
                    this.injectStateToApp(params);
                }
            }
        }
    }
    onError(e) {
        console.warn(e);
    }
    beforeMedia({ method, params, store }) {
        if (store.getState().app.isMediaCh) {
            if (method === "post") {
                params.app.inputCurrentTime = this.media.currentTime > 0 ? this.media.currentTime : 0;
            }
        }
        return params;
    }
    afterMedia(state) {
        switch (state.app.actioned) {
            case "SERVER_TO_API[EMIT]:fetchPosts":
                if (state.app.isMediaCh) {
                    if (this.media.status === "finding" && this.media.ch === state.thread.ch) {
                        this.media.setPostsTimelines(state);
                        this.media.playing();
                    }
                    else {
                        this.media = new Media_1.default();
                        this.media.searching();
                    }
                }
                else {
                    this.media = new Media_1.default();
                    this.media.searching();
                }
                break;
            case "SERVER_TO_API[BROADCAST]:post":
                if (state.app.isMediaCh) {
                    const post = state.posts[0];
                    if (post.ch === this.media.ch) {
                        if (post.uid === state.user.uid) {
                            this.media.refrectSelfPost(post);
                        }
                    }
                }
                break;
        }
    }
}
exports.default = Window;
class Ext {
    constructor(_window) {
        this.window = _window;
        this.onMessage = this.onMessage.bind(this);
        this.onMessageError = this.onMessageError.bind(this);
        this.postMessage = this.postMessage.bind(this);
        window.onmessage = this.onMessage;
        window.onmessageerror = this.onMessageError;
    }
    to(method, params = {}) {
        this.postMessage(method, params);
    }
    postMessage(method, params = {}) {
        const message = {
            id: this.window.id,
            type: PostMessage_1.default.CLIENT_TO_EXT_TYPE,
            method,
            params,
            href: location.href,
        };
        window.top.postMessage(message, this.href);
    }
    onMessage(e) {
        const { id, href, type, method, params, methodBack } = e.data;
        if (type === PostMessage_1.default.EXT_TO_CLIENT_TYPE) {
            if (method === PostMessage_1.default.HANDLE_EXT_AND_CLIENT) {
                this.window.id = id;
                this.window.bootOption = new BootOption_1.default(id, params.bootOption);
                this.href = href;
                const apiState = new store_2.default(this.window.bootOption);
                const clientState = new store_1.default({ ...apiState, ui: params.ui });
                const state = { ...apiState, ...clientState };
                this.window.store.dispatch({ ...state, type: "INIT_CLIENT" });
                this.postMessage(method, state);
            }
            const actionType = PostMessage_1.default.convertExtToClientActionType(method);
            this.window.store.dispatch({ ...params, type: actionType });
        }
    }
    onMessageError(e) {
        console.warn(e);
    }
}
class Dom extends TalknComponent_1.default {
    constructor(_window) {
        super(null);
        this.id = "talkn";
        this.srollHeight = 0;
        this.isScrollBottom = false;
        this.resizeTimer = null;
        this.isAnimateScrolling = false;
        this.window = _window;
        this.load = this.load.bind(this);
        this.resize = this.resize.bind(this);
        this.scroll = this.scroll.bind(this);
        this.renderTalkn = this.renderTalkn.bind(this);
        this.loadContainer = this.loadContainer.bind(this);
        this.updateUiTimeMarker = this.updateUiTimeMarker.bind(this);
        window.onload = this.load;
        window.onresize = this.resize;
        window.onscroll = this.scroll;
    }
    static get resizeInterval() {
        return 300;
    }
    static get selectHtml() {
        return document.querySelector(`html`);
    }
    static get selectBody() {
        return document.querySelector(`body`);
    }
    static get selectTalkn() {
        return document.querySelector(`div#talkn`);
    }
    static get selectPosts() {
        return document.querySelector("[data-component-name=Posts]");
    }
    static get selectAllPost() {
        return document.querySelectorAll("[data-component-name=Post]");
    }
    static get selectAllTimeMarkerList() {
        return document.querySelectorAll("li[data-component-name=TimeMarkerList]");
    }
    renderTalkn() {
        App_2.default(this, this.loadContainer);
    }
    loadContainer() {
        this.html = Dom.selectHtml;
        this.body = Dom.selectBody;
        this.talkn = Dom.selectTalkn;
        this.removeTalknLoading();
    }
    load() { }
    resize(ev) {
        if (window.talknWindow) {
            const { ui } = this.window.store.getState();
            if (this.resizeTimer === null) {
                this.resizeStartWindow(ui);
                this.resizeTimer = setTimeout(() => {
                    this.resizeEndWindow(ui);
                }, Dom.resizeInterval);
            }
        }
    }
    scroll(ev) {
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const scrollHeight = this.body.scrollHeight;
        this.onScroll({ scrollTop, clientHeight, scrollHeight });
    }
    updateUiTimeMarker(scrollTop, { app, ui }) {
        const uiTimeMarker = UiTimeMarker_1.default.generate(scrollTop, Dom.selectAllTimeMarkerList, { app, ui });
        if (uiTimeMarker.list.length > 0) {
            this.clientAction("ON_SCROLL_UPDATE_TIME_MARKER", { uiTimeMarker });
        }
    }
    resizeStartWindow(ui) {
        ui.isTransition = false;
        this.clientAction("ON_RESIZE_START_WINDOW", { ui });
    }
    resizeEndWindow(ui) {
        if (ui) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = null;
            const clientStore = window.talknWindow.store.getState();
            let updateWindow = false;
            if (ui.width !== window.innerWidth) {
                ui.width = window.innerWidth;
                updateWindow = true;
            }
            if (ui.height !== window.innerHeight) {
                ui.height = window.innerHeight;
                updateWindow = true;
            }
            if (updateWindow) {
                ui.screenMode = Ui_1.default.getScreenMode();
                ui.isTransition = true;
                clientStore.ui = ui;
                this.clientAction("ON_RESIZE_END_WINDOW", clientStore);
            }
        }
    }
    animateScrollTo(to = 9999999, duration = 400, callback = () => { }) {
        if (duration === 0) {
            window.scrollTo(0, to);
        }
        else {
            if (!this.isAnimateScrolling) {
                let start = window.scrollY;
                let change = to - start;
                let currentTime = 0;
                let increment = 20;
                const animateScroll = () => {
                    currentTime += increment;
                    let scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);
                    screenTop = Math.floor(scrollTop);
                    window.scrollTo(0, scrollTop);
                    if (currentTime < duration) {
                        this.isAnimateScrolling = true;
                        setTimeout(animateScroll, increment);
                    }
                    else {
                        this.isAnimateScrolling = false;
                        callback();
                    }
                };
                animateScroll();
            }
        }
    }
    exeGetMore() {
        const { thread, app } = this.clientState;
        const posts = Posts_1.default.getDispPosts(this.clientState);
        const dispPostCnt = posts.length;
        const postCntKey = app.dispThreadType === App_1.default.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";
        if (conf_1.default.findOnePostCnt <= dispPostCnt && dispPostCnt < conf_1.default.findOneLimitCnt) {
            if (thread[postCntKey] > conf_1.default.findOnePostCnt) {
                if (dispPostCnt < thread[postCntKey]) {
                    this.api("getMore");
                }
            }
        }
    }
    getPostsHeight() {
        let postsHeight = 0;
        Dom.selectAllPost.forEach((post) => {
            postsHeight += post.clientHeight;
        });
        return postsHeight;
    }
    removeTalknLoading() {
        this.talkn.style["display"] = "initial";
        this.talkn.style["background-image"] = "none";
        this.talkn.style["animation-name"] = "none";
    }
    lockWindow() {
        console.log("---- LOCK");
        const overflow = "hidden";
        this.html.style.overflow = overflow;
        this.body.style.overflow = overflow;
        this.talkn.style.overflow = overflow;
        return window.scrollY;
    }
    unlockWindow() {
        console.log("---- UNLOCK");
        const overflow = "inherit";
        this.html.style.overflow = overflow;
        this.body.style.overflow = overflow;
        this.talkn.style.overflow = overflow;
    }
}
const WsApiResponseCallbacks = {
    GET_BOOT_OPTION: (_window, messageParams) => {
        return _window.bootOption;
    },
};
const talknWindow = new Window();
window.talknWindow = talknWindow;
talknWindow.dom.renderTalkn();
//# sourceMappingURL=talkn.client.js.map