"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
const conf_1 = __importDefault(require("client/conf"));
class Ui extends Schema_1.default {
    constructor(params = {}) {
        super();
        const iFrameId = params.iFrameId ? params.iFrameId : "";
        const width = Ui.getWidth(params);
        const height = Ui.getHeight(params);
        const postsHeight = params.postsHeight ? params.postsHeight : 0;
        const screenMode = Ui.getScreenMode(width);
        const extensionMode = params.extensionMode ? params.extensionMode : Ui.extensionModeExtNoneLabel;
        const extensionWidth = params.extensionWidth ? params.extensionWidth : "0%";
        const extensionHeight = params.extensionHeight ? params.extensionHeight : 0;
        const threadScrollY = params && params.threadScrollY ? params.threadScrollY : 0;
        const isOpenPosts = Ui.getIsOpenPosts({
            height,
            extensionMode,
            extensionHeight,
        });
        const isOpenSetting = params.isOpenSetting ? params.isOpenSetting : false;
        const isOpenMenu = params.isOpenMenu ? params.isOpenMenu : false;
        const isOpenDetail = screenMode === Ui.screenModeDetailLabel ? true : Schema_1.default.isSet(params.isOpenDetail) ? params.isOpenDetail : false;
        const isOpenNewPost = params.isOpenNewPost ? params.isOpenNewPost : false;
        const isOpenNotif = params.isOpenNotif ? params.isOpenNotif : false;
        const isOpenPostsSupporter = Schema_1.default.isSet(params.isOpenPostsSupporter) ? params.isOpenPostsSupporter : false;
        const isOpenBoard = Schema_1.default.isSet(params.isOpenBoard) ? params.isOpenBoard : Ui.getIsOpenBoard({ screenMode });
        const isBubblePost = Schema_1.default.isSet(params.isBubblePost) ? params.isBubblePost : true;
        const isDispPosts = Schema_1.default.isSet(params.isDispPosts) ? params.isDispPosts : false;
        const isOpenLinks = Schema_1.default.isSet(params.isOpenLinks) ? params.isOpenLinks : false;
        const isTransition = Schema_1.default.isSet(params.isTransition) ? params.isTransition : true;
        const menuComponent = params.menuComponent ? params.menuComponent : Ui.getDefaultMenuComponent();
        const openLockMenu = params.openLockMenu ? params.openLockMenu : Ui.openLockMenuLabelNo;
        const openInnerNotif = params.openInnerNotif ? params.openInnerNotif : "";
        const detailCh = params.detailCh ? params.detailCh : "/";
        const inputPost = params.inputPost ? params.inputPost : "";
        const inputStampId = params.inputStampId ? params.inputStampId : false;
        const inputCurrentTime = params.inputCurrentTime ? params.inputCurrentTime : 0.0;
        const inputSearch = params.inputSearch ? params.inputSearch : "";
        const isLoading = Schema_1.default.isSet(params.isLoading) ? params.isLoading : true;
        return this.create({
            iFrameId,
            width,
            height,
            postsHeight,
            screenMode,
            extensionMode,
            extensionWidth,
            extensionHeight,
            threadScrollY,
            isOpenPosts,
            isOpenSetting,
            isOpenMenu,
            isOpenDetail,
            isOpenNewPost,
            isOpenNotif,
            isOpenPostsSupporter,
            isOpenBoard,
            isBubblePost,
            isDispPosts,
            isOpenLinks,
            isTransition,
            menuComponent,
            openLockMenu,
            openInnerNotif,
            detailCh,
            inputPost,
            inputStampId,
            inputCurrentTime,
            inputSearch,
            isLoading,
        });
    }
    static get openLockMenuLabelNo() {
        return "No";
    }
    static get openLockMenuLabelLike() {
        return "Like";
    }
    static get openLockMenuLabelShare() {
        return "Share";
    }
    static get openLockMenuLabelAbout() {
        return "About";
    }
    static get screenModeSmallLabel() {
        return "SMALL";
    }
    static get screenModeMiddleLabel() {
        return "MIDDLE";
    }
    static get screenModeLargeLabel() {
        return "LARGE";
    }
    static get screenModeIndexLabel() {
        return "MENU";
    }
    static get screenModeThreadLabel() {
        return "THREAD";
    }
    static get screenModeDetailLabel() {
        return "DETAIL";
    }
    static get screenModeSmallWidthPx() {
        return conf_1.default.screenMode.small;
    }
    static get screenModeMiddleWidthPx() {
        return conf_1.default.screenMode.middle;
    }
    static get extensionModeExtModalLabel() {
        return "Modal";
    }
    static get extensionModeExtBottomLabel() {
        return "Bottom";
    }
    static get extensionModeExtEmbedLabel() {
        return "Embed";
    }
    static get extensionModeExtNoneLabel() {
        return "None";
    }
    static get menuComponentUsersLabel() {
        return "Users";
    }
    static get menuComponentRankLabel() {
        return "Rank";
    }
    static get menuComponentLogsLabel() {
        return "Logs";
    }
    static get menuComponentSettingLabel() {
        return "Setting";
    }
    static getDefaultMenuComponent() {
        return Ui.menuComponentRankLabel;
    }
    static getWidth(params) {
        if (params && params.extensionWidth > 0) {
            return params.extensionWidth;
        }
        if (params && params.width > 0) {
            return params.width;
        }
        if (typeof window === "object" && window.innerWidth) {
            return window.innerWidth;
        }
        if (params.width) {
            if (typeof params.width === "string") {
                if (params.width.indexOf("px") >= 0) {
                    return Number(params.width.replace("px", ""));
                }
            }
            return params.width;
        }
        return 0;
    }
    static getHeight(params = {}) {
        if (params && params.extensionHeigt > 0) {
            return params.extensionHeigt;
        }
        if (params && params.height > 0) {
            return params.height;
        }
        if (typeof window === "object" && window.innerHeight) {
            return window.innerHeight;
        }
        return 0;
    }
    static getScreenMode(widthPx = 0) {
        if (!widthPx) {
            if ((window && window.innerWidth === 0) || window.innerHeight === 0) {
                return undefined;
            }
            if (window && window.innerWidth > 0) {
                widthPx = window.innerWidth;
            }
        }
        if (typeof widthPx === "string") {
            widthPx = widthPx.replace("px", "");
        }
        if (Ui.screenModeSmallWidthPx >= widthPx) {
            return Ui.screenModeSmallLabel;
        }
        if (Ui.screenModeSmallWidthPx <= widthPx && Ui.screenModeMiddleWidthPx >= widthPx) {
            return Ui.screenModeMiddleLabel;
        }
        return Ui.screenModeLargeLabel;
    }
    static getIsOpenBoard(ui) {
        switch (ui.screenMode) {
            case Ui.screenModeSmallLabel:
                return false;
            case Ui.screenModeMiddleLabel:
            case Ui.screenModeLargeLabel:
                return true;
        }
    }
    static getIsOpenPosts(ui, called = "") {
        let { extensionMode, height, extensionHeight, extensionCloseHeight } = ui;
        const log = false;
        const al = false;
        if (extensionMode === Ui.extensionModeExtBottomLabel || extensionMode === Ui.extensionModeExtModalLabel) {
            if (typeof height !== "number")
                height = Number(height);
            if (typeof extensionHeight !== "number")
                extensionHeight = Number(extensionHeight);
            if (height === 0) {
                if (log)
                    console.log("@getIsOpenPosts A " + " " + extensionHeight + " " + height);
                if (al)
                    alert("@getIsOpenPosts A " + " " + extensionHeight + " " + height);
                return false;
            }
            if (extensionHeight <= height) {
                if (log)
                    console.log("@getIsOpenPosts C " + " " + extensionHeight + " " + height);
                if (al)
                    alert("@getIsOpenPosts C " + " " + extensionHeight + " " + height);
                return true;
            }
            if (log)
                console.log("@getIsOpenPosts D " + " " + extensionHeight + " " + height);
            if (al)
                alert("@getIsOpenPosts D " + " " + extensionHeight + " " + height);
            return false;
        }
        else {
            if (log)
                console.log("@getIsOpenPosts E " + " " + extensionHeight + " " + height);
            if (al)
                alert("@getIsOpenPosts E " + " " + extensionHeight + " " + height);
            return true;
        }
    }
    static getUiUpdatedOpenFlgs({ app, ui }, call = "") {
        switch (call) {
            case "toggleMain":
            case "headerDetailIcon":
                switch (ui.screenMode) {
                    case Ui.screenModeSmallLabel:
                        ui.isOpenDetail = !ui.isOpenDetail;
                        break;
                    case Ui.screenModeMiddleLabel:
                        if (ui.isOpenDetail) {
                            if (app.detailCh === app.rootCh) {
                                ui.isOpenDetail = false;
                                ui.isOpenMenu = true;
                            }
                            else {
                                ui.isOpenMenu = false;
                                ui.isOpenDetail = false;
                            }
                        }
                        else {
                            ui.isOpenMenu = false;
                            ui.isOpenDetail = true;
                        }
                        break;
                }
                break;
            case "headerMenuIcon":
                switch (ui.screenMode) {
                    case Ui.screenModeMiddleLabel:
                        if (ui.isOpenDetail) {
                            ui.isOpenMenu = true;
                            ui.isOpenDetail = false;
                        }
                        else {
                            ui.isOpenMenu = true;
                            ui.isOpenDetail = false;
                        }
                        break;
                }
                break;
            case "changeThreadDetail":
            case "post":
                switch (ui.screenMode) {
                    case Ui.screenModeSmallLabel:
                        ui.isOpenDetail = !ui.isOpenDetail;
                        break;
                    case Ui.screenModeMiddleLabel:
                        ui.isOpenMenu = false;
                        ui.isOpenDetail = true;
                    case Ui.screenModeLargeLabel:
                        ui.isOpenMenu = true;
                        ui.isOpenDetail = true;
                        break;
                }
                break;
        }
        return ui;
    }
}
exports.default = Ui;
//# sourceMappingURL=Ui.js.map