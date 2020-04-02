"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const Schema_1 = __importDefault(require("api/store/Schema"));
const Message_1 = __importDefault(require("common/Message"));
const Posts_1 = __importDefault(require("api/store/Posts"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const UiTimeMarker_1 = __importDefault(require("api/store/UiTimeMarker"));
const conf_1 = __importDefault(require("client/conf"));
const actionWrap_1 = __importDefault(require("client/container/util/actionWrap"));
const TalknMedia_1 = __importDefault(require("client/operations/TalknMedia"));
const container_1 = __importDefault(require("client/container/"));
const apiStore_1 = __importDefault(require("api/store/apiStore"));
const clientStore_1 = __importDefault(require("client/store/clientStore"));
const storage_1 = __importDefault(require("client/mapToStateToProps/storage"));
class TalknWindow {
    constructor() {
        this.id = "talkn1";
        this.resizeTimer = null;
        this.parentUrl = null;
        this.threadHeight = 0;
        this.innerHeight = 0;
        this.scrollHeight = 0;
        this.isLoaded = false;
        this.isMessageed = false;
        this.isExistParentWindow = false;
        this.isAnimateScrolling = false;
        this.isScrollBottom = true;
        this.load = this.load.bind(this);
        this.resize = this.resize.bind(this);
        this.scroll = this.scroll.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.parentExtTo = this.parentExtTo.bind(this);
        this.parentCoreApi = this.parentCoreApi.bind(this);
        this.resizeStartWindow = this.resizeStartWindow.bind(this);
        this.resizeEndWindow = this.resizeEndWindow.bind(this);
        this.setIsScrollBottom = this.setIsScrollBottom.bind(this);
        this.clientState = clientStore_1.default();
        this.apiState = apiStore_1.default();
        this.dom = {};
        this.dom.html = document.querySelector("html");
        this.dom.body = document.querySelector("body");
        this.dom.talkn1 = document.querySelector("#talkn1");
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
        document.querySelectorAll("[data-component-name=Post]").forEach(post => {
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
        const html = document.querySelector("html");
        html.style.cssText +=
            "" +
                "width 100% !important;" +
                "height: 100% !important;" +
                "margin: 0px auto !important;" +
                "padding-top: 0px !important;";
        const body = document.querySelector("body");
        body.style.cssText +=
            "" +
                "width 100% !important;" +
                "height: 100% !important;" +
                "margin: 0px auto !important;" +
                "visibility: visible !important;" +
                "opacity: 1 !important;";
    }
    listenAsyncBoot() {
        const bootPromise = [];
        bootPromise.push(new Promise(loadResolve => {
            if (document.readyState === "complete") {
                this.load(loadResolve);
            }
            else {
                window.addEventListener("load", ev => {
                    this.load(loadResolve);
                });
            }
        }));
        bootPromise.push(new Promise(messageResolve => {
            window.addEventListener("message", e => {
                if (e.data && e.data.type === Message_1.default.coreApiToApp) {
                    if (e.data.method === Message_1.default.connectionMethod) {
                        this.bootOption = e.data.params;
                        this.parentCoreApi(Message_1.default.connectionMethod);
                        messageResolve(e);
                    }
                    else {
                        const clientState = this.clientState.getState();
                        const dispatchState = Object.assign(Object.assign({}, clientState), e.data.params);
                        this.apiState = apiStore_1.default(e.data.params);
                        this.clientState.dispatch(Object.assign(Object.assign({}, dispatchState), { type: e.data.method }));
                    }
                }
                if (e.origin === "https://www.youtube.com") {
                }
            });
        }));
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.scroll);
        window.talknMedia = new TalknMedia_1.default();
        Promise.all(bootPromise).then((bootParams) => {
            react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: this.clientState },
                react_1.default.createElement(container_1.default, null)), document.getElementById(this.id), () => { });
        });
    }
    onMessage(e) {
        if (e.data.type === "talkn") {
            const log = false;
            switch (e.data.method) {
                case "bootExtension":
                    this.parentUrl = e.data.href;
                    this.parentExtTo("bootExtension", conf_1.default);
                    break;
                case "findMediaCh":
                    if (e.data.params.thread && e.data.params.thread.ch) {
                        if (log) {
                            console.log("============== findMediaCh A " + e.data.params.thread.ch);
                        }
                        const { ui } = window.talknWindow.apiState.getState();
                        actionWrap_1.default.onClickCh(e.data.params.thread.ch, ui, false, e.data.method);
                        TalknMedia_1.default.init("TalknWindow");
                        window.talknWindow.parentCoreApi("startLinkMedia", e.data.params);
                        window.talknMedia = new TalknMedia_1.default();
                    }
                    break;
                case "playMedia":
                    const playMediaState = window.talknWindow.apiState.getState();
                    const ch = e.data.params.thread && e.data.params.thread.ch ? e.data.params.thread.ch : playMediaState.thread.ch;
                    const isExistThreadData = playMediaState.threads[ch];
                    if (log && window.talknMedia)
                        console.log("========================= playMedia " + window.talknMedia.currentTime);
                    if (window.talknMedia === undefined) {
                        TalknMedia_1.default.init("TalknWindow");
                        window.talknWindow.parentCoreApi("startLinkMedia", e.data.params);
                        window.talknMedia = new TalknMedia_1.default();
                        if (log)
                            console.log("============== playMedia A " + window.talknMedia.currentTime);
                    }
                    if (window.talknMedia && Schema_1.default.isSet(window.talknMedia.currentTime) && window.talknMedia.started === false) {
                        window.talknMedia.currentTime = window.talknMedia.getCurrentTime(e.data.params.currentTime);
                        if (log)
                            console.log("============== playMedia B " + window.talknMedia.currentTime);
                    }
                    if (e.data.params.thread &&
                        e.data.params.thread.ch &&
                        window.talknMedia &&
                        window.talknMedia.timeline &&
                        window.talknMedia.timeline.length === 0 &&
                        window.talknMedia.started === false &&
                        isExistThreadData) {
                        const timeline = storage_1.default.getStoragePostsTimeline(ch);
                        if (log)
                            console.log("============== playMedia C " + ch);
                        window.talknMedia.setTimeline(timeline);
                    }
                    if ((window.talknMedia && window.talknMedia.timeline && isExistThreadData) ||
                        e.data.params.event === "seeked") {
                        if (log)
                            console.log("============== playMedia D");
                        if (log)
                            console.log(window.talknMedia.timeline);
                        if (log)
                            console.log("============== ");
                        window.talknMedia.proccess(e.data.params.currentTime);
                    }
                    break;
                case "endMedia":
                    if (e.data.params.playCnt > 0) {
                        window.talknMedia.endedFunc();
                    }
                    break;
                case "delegatePost":
                    const delegateState = window.talknWindow.apiState.getState();
                    let { app } = delegateState;
                    app = Object.assign(Object.assign({}, app), e.data.params);
                    window.talknWindow.parentCoreApi("delegatePost", app);
                    break;
                default:
                    break;
            }
        }
    }
    load(resolve) {
        this.threadHeight = document.querySelector("html").scrollHeight;
        this.scrollHeight = window.scrollY;
        this.innerHeight = window.innerHeight;
        this.setupWindow();
        resolve(true);
    }
    ready(ev) { }
    resize(ev) {
        if (window.talknWindow) {
            const ui = window.talknWindow.apiState.getState().ui;
            if (ui.extensionMode === "EXT_BOTTOM" || ui.extensionMode === "EXT_MODAL") {
                if (this.resizeTimer === null) {
                    this.resizeTimer = setTimeout(() => {
                        this.resizeEndWindow();
                    }, TalknWindow.resizeInterval);
                }
            }
            else {
                if (this.resizeTimer === null) {
                    this.resizeTimer = setTimeout(app => {
                        this.resizeEndWindow();
                    }, TalknWindow.resizeInterval);
                }
            }
        }
    }
    scroll(ev) {
        const state = window.talknWindow.apiState.getState();
        const { app, ui, thread, uiTimeMarker } = state;
        if (ui.isOpenNewPost) {
            window.talknWindow.parentCoreApi("closeNewPost");
        }
        const newUiTimeMarker = UiTimeMarker_1.default.update(window.scrollY, uiTimeMarker);
        if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
            window.talknWindow.parentCoreApi("onScrollUpdateTimeMarker", newUiTimeMarker);
        }
        window.talknWindow.setIsScrollBottom({ app, ui });
        if (window.scrollY === 0) {
            if (thread.postCnt > conf_1.default.findOnePostCnt) {
                const timeMarkerList = document.querySelector("[data-component-name=TimeMarkerList]");
                if (timeMarkerList && timeMarkerList.style) {
                    timeMarkerList.style.opacity = 0;
                }
                window.talknWindow.exeGetMore(state);
            }
        }
    }
    exeGetMore(state) {
        const { thread, app } = state;
        const posts = Posts_1.default.getDispPosts(state);
        const dispPostCnt = posts.length;
        const postCntKey = app.dispThreadType === App_1.default.dispThreadTypeMulti ? "multiPostCnt" : "postCnt";
        if (conf_1.default.findOnePostCnt <= dispPostCnt && dispPostCnt < conf_1.default.findOneLimitCnt) {
            if (thread[postCntKey] > conf_1.default.findOnePostCnt) {
                if (dispPostCnt < thread[postCntKey]) {
                    window.talknWindow.parentCoreApi("getMore");
                }
            }
        }
    }
    setIsScrollBottom(ui, isScrollBottom = true) {
        if (ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel) {
            if (ui.screenMode === Ui_1.default.screenModeLargeLabel) {
                this.isScrollBottom = isScrollBottom;
            }
            else {
                const htmlScrollHeight = document.querySelector("html").scrollHeight;
                this.innerHeight = window.innerHeight;
                this.scrollHeight = window.scrollY;
                const bodyScrollHeight = document.querySelector("body").scrollTop;
                this.isScrollBottom = htmlScrollHeight === this.innerHeight + this.scrollHeight;
            }
        }
        else {
            this.isScrollBottom = isScrollBottom;
        }
    }
    updateUiTimeMarker(scrollTop) {
        const timeMarkers = document.querySelectorAll("li[data-component-name=TimeMarkerList]");
        const uiTimeMarker = UiTimeMarker_1.default.generate(scrollTop, timeMarkers);
        if (uiTimeMarker.list.length > 0) {
            window.talknWindow.parentAction("onScrollUpdateTimeMarker", uiTimeMarker);
        }
    }
    resizeStartWindow(ui) {
        ui.width = window.innerWidth;
        ui.height = window.innerHeight;
        ui.isTransition = false;
        ui.screenMode = Ui_1.default.getScreenMode();
        const setting = window.talknWindow.apiState.getState().setting;
        window.talknWindow.parentCoreApi("onResizeStartWindow", { ui, setting });
    }
    resizeEndWindow() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = null;
        const apiState = window.talknWindow.apiState.getState();
        const ui = apiState.ui;
        ui.width = window.innerWidth;
        ui.height = window.innerHeight;
        ui.screenMode = Ui_1.default.getScreenMode();
        const setting = apiState.setting;
        const bootOption = apiState.bootOption;
        window.talknWindow.parentCoreApi("onResizeEndWindow", { ui, setting, bootOption });
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
    lockWindow() {
        const overflow = "hidden";
        this.dom.html.style.overflow = overflow;
        this.dom.body.style.overflow = overflow;
        this.dom.talkn1.style.overflow = overflow;
        return window.scrollY;
    }
    unlockWindow() {
        const overflow = "inherit";
        this.dom.html.style.overflow = overflow;
        this.dom.body.style.overflow = overflow;
        this.dom.talkn1.style.overflow = overflow;
    }
    appendRoot() {
        const container = document.createElement("talkn");
        container.id = this.id;
        document.body.appendChild(container);
        return true;
    }
    parentExtTo(method, params) {
        if (this.parentUrl) {
            window.top.postMessage({
                type: "talknExt",
                method,
                params
            }, this.parentUrl);
        }
    }
    parentCoreApi(method, params1 = null, params2 = null) {
        if (params2) {
        }
        window.postMessage({
            type: Message_1.default.appToCoreApi,
            method,
            params1,
            params2
        }, location.href);
    }
}
exports.default = TalknWindow;
//# sourceMappingURL=TalknWindow.js.map