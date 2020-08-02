"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PostMessage_1 = __importDefault(require("common/PostMessage"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const Sequence_1 = __importDefault(require("api/Sequence"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const App_1 = __importDefault(require("api/store/App"));
const store_1 = __importDefault(require("client/store/"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const UiTimeMarker_1 = __importDefault(require("client/store/UiTimeMarker"));
const conf_1 = __importDefault(require("client/conf"));
const container_1 = __importDefault(require("client/container/"));
const apiStore_1 = __importDefault(require("api/store/apiStore"));
const clientStore_1 = __importDefault(require("client/store/clientStore"));
class TalknWindow extends TalknComponent_1.default {
    constructor(props = null) {
        super(props);
        this.id = "talkn";
        this.resizeTimer = null;
        this.scrollTop = 0;
        this.clientHeight = 0;
        this.scrollHeight = 0;
        this.isScrollBottom = false;
        this.isAnimateScrolling = false;
        this.parentiFrameId = "";
        this.parentHref = location.href;
        this.extUiParams = {};
        this.stores = { client: clientStore_1.default(), api: apiStore_1.default() };
        this.load = this.load.bind(this);
        this.resize = this.resize.bind(this);
        this.scroll = this.scroll.bind(this);
        this.parentExtTo = this.parentExtTo.bind(this);
        this.listenAsyncBoot = this.listenAsyncBoot.bind(this);
        this.exeGetMore = this.exeGetMore.bind(this);
        this.resizeStartWindow = this.resizeStartWindow.bind(this);
        this.resizeEndWindow = this.resizeEndWindow.bind(this);
        this.removeTalknBg = this.removeTalknBg.bind(this);
        this.dom = {};
        this.dom.talkn = document.querySelector(`div#${this.id}`);
        this.dom.html = document.querySelector(`html`);
        this.dom.body = document.querySelector(`body`);
        this.dom.posts = document.querySelector(`[data-component-name=Posts]`);
        this.listenAsyncBoot();
    }
    static get resizeInterval() {
        return 300;
    }
    static getPostsClientHeight() {
        const postsClient = document.querySelector("[data-component-name=Posts]");
        return postsClient ? postsClient.clientHeight : 0;
    }
    static getPostsHeight() {
        let postsHeight = 0;
        document.querySelectorAll("[data-component-name=Post]").forEach((post) => {
            postsHeight += post.clientHeight;
        });
        return postsHeight;
    }
    static getLastPostHeight() {
        const posts = document.querySelector("[data-component-name=Posts]");
        if (posts && posts.lastChild && posts.lastChild.clientHeight) {
            return posts.lastChild.clientHeight;
        }
        return 0;
    }
    setupWindow() {
    }
    listenAsyncBoot() {
        const bootPromise = [];
        bootPromise.push(new Promise((loadResolve) => {
            if (document.readyState === "complete") {
                this.load(loadResolve);
            }
            else {
                window.addEventListener("load", (ev) => {
                    this.load(loadResolve);
                });
            }
        }));
        bootPromise.push(new Promise((messageResolve) => {
            window.addEventListener("message", (e) => {
                console.log(e.data);
                switch (e.data.type) {
                    case PostMessage_1.default.EXT_TO_CLIENT_TYPE:
                        switch (e.data.method) {
                            case PostMessage_1.default.HANDLE_EXT_AND_CLIENT:
                                this.parentiFrameId = e.data.iFrameId;
                                this.parentHref = e.data.href;
                                this.parentExtTo(PostMessage_1.default.HANDLE_EXT_AND_CLIENT, conf_1.default);
                                this.extUiParams = e.data.params.ui;
                                break;
                            default:
                                const clientState = this.stores.client.getState();
                                const actionType = Sequence_1.default.convertExtToClientActionType(this.parentiFrameId, e.data.method);
                                const dispatchState = { ...clientState, ...e.data.params };
                                this.stores.client.dispatch({ ...dispatchState, type: actionType });
                                break;
                        }
                        break;
                    case PostMessage_1.default.API_TO_CLIENT_TYPE:
                        if (e.data.method === PostMessage_1.default.HANDLE_API_AND_CLIENT) {
                            this.bootOption = e.data.params;
                            this.api(PostMessage_1.default.HANDLE_API_AND_CLIENT);
                            messageResolve(e);
                        }
                        else {
                            const actionType = Sequence_1.default.convertApiToClientActionType(e.data.method);
                            const apiState = e.data.params;
                            if (actionType === "API_TO_CLIENT[REQUEST]:tune") {
                                const initClientState = { ...apiState, ...this.extUiParams, type: actionType };
                                const clientState = new store_1.default(initClientState);
                                this.stores.client.dispatch({ ...clientState, type: actionType });
                            }
                            else {
                                this.stores.client.dispatch({ ...apiState, type: actionType });
                            }
                        }
                        break;
                    case PostMessage_1.default.MEDIA_TO_CLIENT_TYPE:
                        this.stores.api.dispatch({
                            type: e.data.method,
                            postsTimeline: e.data.params.postsTimeline,
                        });
                        this.stores.client.dispatch({ type: e.data.method });
                        break;
                }
                if (e.origin === "https://www.youtube.com") {
                }
            });
        }));
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        Promise.all(bootPromise).then((bootParams) => {
            react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: this.stores.client },
                react_1.default.createElement(container_1.default, null)), document.querySelector(`div#${this.id}`), () => { });
        });
    }
    load(resolve) {
        this.setupWindow();
        resolve(true);
    }
    ready(ev) { }
    resize(ev) {
        if (window.talknWindow) {
            const { app, ui } = this.clientState;
            if (this.resizeTimer === null) {
                this.resizeStartWindow(ui);
                this.resizeTimer = setTimeout(() => {
                    this.resizeEndWindow(ui);
                }, TalknWindow.resizeInterval);
            }
        }
    }
    scroll(ev) {
        const body = document.querySelector("body");
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        const scrollHeight = body.scrollHeight;
        this.onScroll({ scrollTop, clientHeight, scrollHeight });
    }
    exeGetMore(clientState) {
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
    updateUiTimeMarker(scrollTop, { app, ui }) {
        const timeMarkers = document.querySelectorAll("li[data-component-name=TimeMarkerList]");
        const uiTimeMarker = UiTimeMarker_1.default.generate(scrollTop, timeMarkers, { app, ui });
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
            const clientStore = window.talknWindow.clientStore.getState();
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
    removeTalknBg() {
        this.dom.talkn.style["display"] = "initial";
        this.dom.talkn.style["background-image"] = "none";
        this.dom.talkn.style["animation-name"] = "none";
    }
    lockWindow() {
        console.log("---- LOCK");
        const overflow = "hidden";
        this.dom.html.style.overflow = overflow;
        this.dom.body.style.overflow = overflow;
        this.dom.talkn.style.overflow = overflow;
        return window.scrollY;
    }
    unlockWindow() {
        console.log("---- UNLOCK");
        const overflow = "inherit";
        this.dom.html.style.overflow = overflow;
        this.dom.body.style.overflow = overflow;
        this.dom.talkn.style.overflow = overflow;
    }
    appendRoot() {
        const container = document.createElement("talkn");
        container.id = this.id;
        document.body.appendChild(container);
        return true;
    }
    parentExtTo(method, params) {
        if (this.parentHref) {
            window.top.postMessage({
                type: PostMessage_1.default.CLIENT_TO_EXT_TYPE,
                iFrameId: this.parentiFrameId,
                method,
                params,
            }, this.parentHref);
        }
    }
}
exports.default = TalknWindow;
//# sourceMappingURL=TalknWindow.js.map