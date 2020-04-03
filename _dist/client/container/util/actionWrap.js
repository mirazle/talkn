"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const App_1 = __importDefault(require("api/store/App"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Thread_1 = __importDefault(require("api/store/Thread"));
exports.default = {
    onClickCh: (toCh, ui, overWriteHasSlash, called) => {
        let { app, thread, menuIndex, setting } = window.talknWindow.apiState.getState();
        ui.isOpenLinks = false;
        if (called === "backToRootCh") {
            if (ui.screenMode === Ui_1.default.screenModeSmallLabel) {
                ui.isOpenMenu = true;
                ui.isOpenBoard = true;
            }
        }
        const beforeCh = thread.ch;
        thread.ch = toCh;
        if (Schema_1.default.isSet(overWriteHasSlash)) {
            thread.hasSlash = overWriteHasSlash;
        }
        const threadStatus = Thread_1.default.getStatus(thread, app, setting);
        let { app: updatedApp, stepTo } = App_1.default.getStepToDispThreadType({ app, menuIndex }, threadStatus, toCh, called);
        if (!app.isLinkCh && updatedApp.isLinkCh) {
            window.talknWindow.parentCoreApi("onCatchChAPI", toCh);
        }
        if (app.isLinkCh && !updatedApp.isLinkCh) {
            window.talknWindow.parentCoreApi("offCatchChAPI", beforeCh);
        }
        app = updatedApp;
        switch (stepTo) {
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeChild}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeChild}`:
                window.talknWindow.parentCoreApi("onClickToChildThread", { ui, thread });
                window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
                break;
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeMulti}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeMulti}`:
                window.talknWindow.parentCoreApi("onClickToMultiThread", { ui, thread });
                window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
                break;
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeSingle}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeSingle}`:
                window.talknWindow.parentCoreApi("onClickToSingleThread", { ui, thread });
                window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
                break;
            case `${App_1.default.dispThreadTypeMulti} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeSingle} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeChild} to ${App_1.default.dispThreadTypeTimeline}`:
            case `${App_1.default.dispThreadTypeTimeline} to ${App_1.default.dispThreadTypeTimeline}`:
                window.talknWindow.parentCoreApi("onClickToTimelineThread", { ui, thread });
                window.talknWindow.parentCoreApi("changeThread", toCh, { app, thread });
                break;
        }
    }
};
//# sourceMappingURL=actionWrap.js.map