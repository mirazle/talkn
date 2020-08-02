"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Schema_1 = __importDefault(require("api/store/Schema"));
const App_1 = __importDefault(require("api/store/App"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const UiTimeMarker_1 = __importDefault(require("client/store/UiTimeMarker"));
const conf_1 = __importDefault(require("client/conf"));
const Ui_1 = __importDefault(require("client/store/Ui"));
class TalknComponent extends react_1.Component {
    constructor(props) {
        super(props);
        this.Posts = document.querySelector("[data-component-name=Posts]");
        this.onScroll = this.onScroll.bind(this);
    }
    get clientStore() {
        if (window.talknWindow) {
            return window.talknWindow.store;
        }
    }
    get clientState() {
        if (window.talknWindow) {
            return window.talknWindow.store.getState();
        }
    }
    api(method, params = {}) {
        window.talknWindow.api(method, params);
    }
    clientAction(type, params, callback = () => { }) {
        const action = params ? { ...params, type } : { type };
        window.talknWindow.store.dispatch(action);
    }
    onClickCh(toCh, ui, overWriteHasSlash, called) {
        let { app, thread, rank, setting } = this.clientState;
        const beforeCh = thread.ch;
        thread.ch = toCh;
        ui.isOpenLinks = false;
        ui.isOpenMenu = ui.screenMode === Ui_1.default.screenModeSmallLabel ? ui.isOpenMenu : false;
        ui.isOpenBoard = true;
        if (Schema_1.default.isSet(overWriteHasSlash))
            thread.hasSlash = overWriteHasSlash;
        const threadStatus = Thread_1.default.getStatus(thread, app, setting);
        let { app: updatedApp, stepTo } = App_1.default.getStepToDispThreadType({ app, rank }, threadStatus, toCh, called);
        if (!app.isLinkCh && updatedApp.isLinkCh)
            this.api("on", toCh);
        if (app.isLinkCh && !updatedApp.isLinkCh)
            this.api("off", beforeCh);
        app = updatedApp;
        app.offsetFindId = App_1.default.defaultOffsetFindId;
        switch (stepTo) {
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeChild}`:
                this.clientAction("ON_CLICK_TO_CHILD_THREAD", { ui });
                this.api("changeThread", { app, thread });
                break;
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeMulti}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeMulti}`:
                this.clientAction("ON_CLICK_TO_MULTI_THREAD", { ui });
                this.api("changeThread", { app, thread });
                break;
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeSingle}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeSingle}`:
                this.clientAction("ON_CLICK_TO_SINGLE_THREAD", { ui });
                this.api("changeThread", { app, thread });
                break;
            case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeTimeline}`:
                this.clientAction("ON_CLICK_TO_TIMELINE_THREAD", { ui });
                this.api("changeThread", { app, thread });
                break;
        }
    }
    onScroll({ scrollTop = 0, clientHeight = 0, scrollHeight = 0 }) {
        const { thread, app, ui, actionLog } = this.clientState;
        const actionTypes = ui.extensionMode === Ui_1.default.extensionModeExtNoneLabel
            ? ["ON_RESIZE_END_WINDOW"]
            : ["ON_RESIZE_END_WINDOW", "ON_SCROLL_UPDATE_TIME_MARKER"];
        let { uiTimeMarker } = this.clientState;
        if (scrollTop === 0) {
            if (!actionTypes.includes(actionLog[0])) {
                const postCntKey = app.multistream ? "multiPostCnt" : "postCnt";
                if (thread[postCntKey] > conf_1.default.findOnePostCnt) {
                    const timeMarkerList = document.querySelector("[data-component-name=TimeMarkerList]");
                    if (timeMarkerList && timeMarkerList.style) {
                        timeMarkerList.style.opacity = 0;
                    }
                    window.talknWindow.dom.exeGetMore(this.clientStore);
                }
            }
        }
        if (ui.isOpenNewPost) {
            this.clientAction("CLOSE_NEW_POST");
        }
        const newUiTimeMarker = UiTimeMarker_1.default.update(scrollTop, uiTimeMarker);
        if (uiTimeMarker.now.label !== newUiTimeMarker.now.label) {
            this.clientAction("ON_SCROLL_UPDATE_TIME_MARKER", { uiTimeMarker: newUiTimeMarker });
        }
        window.talknWindow.dom.scrollTop = scrollTop;
        window.talknWindow.dom.scrollHeight = scrollHeight;
        window.talknWindow.dom.clientHeight = clientHeight;
        window.talknWindow.dom.isScrollBottom = scrollHeight === scrollTop + clientHeight;
    }
    scrollToDidUpdateGetMore() {
        const { ui } = this.clientState;
        const Posts = document.querySelector("[data-component-name=Posts]");
        const scrollHeight = ui.screenMode === Ui_1.default.screenModeLargeLabel || ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? Posts.scrollHeight
            : document.body.scrollHeight;
        window.talknWindow.dom.scrollTop = scrollHeight - window.talknWindow.dom.scrollHeight;
        Posts.scrollTop = window.talknWindow.dom.scrollTop;
        window.scrollTo(0, window.talknWindow.dom.scrollTop);
    }
}
exports.default = TalknComponent;
//# sourceMappingURL=TalknComponent.js.map