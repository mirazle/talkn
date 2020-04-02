"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
const DetailFooter_1 = __importDefault(require("client/components/DetailFooter"));
const EmotionGraph_1 = __importDefault(require("client/components/EmotionGraph"));
const LockMenu_1 = __importDefault(require("client/components/LockMenu"));
const Icon_1 = __importDefault(require("client/components/Icon"));
class Detail extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
    }
    handleOnClickLike() {
        const { clientState, onClickOpenLockMenu, openInnerNotif } = this.props;
        const { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            openInnerNotif();
        }
    }
    handleOnClickShare() {
        const { clientState, onClickOpenLockMenu } = this.props;
        const { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelShare);
        }
    }
    handleOnClickPortal() {
        const { clientState, onClickOpenLockMenu } = this.props;
        const { ui } = clientState;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
    }
    handleOnClickUpdate() {
        const { threadDetail } = this.apiState;
        const { openInnerNotif } = this.props;
        openInnerNotif("Thread data has been updated.");
        window.talknWindow.parentCoreApi("updateThread", threadDetail.ch);
    }
    getImgStyle(state, style, protocol, serverMetas) {
        const { threadDetail } = this.apiState;
        let backgroundImage = style.detail.img.backgroundImage;
        let backgroundSize = style.detail.img.backgroundSize;
        switch (threadDetail.findType) {
            case Thread_1.default.findTypeHtml:
                if (serverMetas["og:image"]) {
                    if (`${serverMetas["og:image"]}`.indexOf(Sequence_1.default.HTTPS_PROTOCOL) === 0 ||
                        `${serverMetas["og:image"]}`.indexOf(Sequence_1.default.HTTP_PROTOCOL) === 0) {
                        backgroundImage = `url("${serverMetas["og:image"]}")`;
                    }
                    else {
                        if (protocol === Sequence_1.default.TALKN_PROTOCOL) {
                            backgroundImage = `url("${Sequence_1.default.HTTPS_PROTOCOL}${serverMetas["og:image"]}")`;
                        }
                        else {
                            backgroundImage = `url("${protocol}${serverMetas["og:image"]}")`;
                        }
                    }
                    backgroundSize = "cover";
                }
                break;
            case Thread_1.default.findTypeMusic:
                backgroundImage = `url("${conf_1.default.ogpImages.Music}")`;
                backgroundSize = "cover";
                break;
            case Thread_1.default.findTypeVideo:
                backgroundImage = `url("${conf_1.default.ogpImages.Video}")`;
                backgroundSize = "cover";
                break;
        }
        return Object.assign(Object.assign({}, style.detail.img), { backgroundImage, backgroundSize });
    }
    getDescription(serverMetas) {
        if (serverMetas) {
            if (serverMetas["description"] !== conf_1.default.description) {
                return serverMetas["description"];
            }
            if (serverMetas["og:description"]) {
                return serverMetas["og:description"];
            }
        }
        return conf_1.default.description;
    }
    renderHeader() {
        const { threadDetail } = this.apiState;
        const { clientState, handleOnClickToggleDetail } = this.props;
        const { style } = clientState;
        return (react_1.default.createElement("header", { "data-component-name": "DetailHeader", onClick: handleOnClickToggleDetail, style: style.detail.header },
            react_1.default.createElement("span", { style: style.detail.headerP },
                react_1.default.createElement(Marquee_1.default, { text: threadDetail.title, loop: true, hoverToStop: false, trailing: 0, leading: 0 }))));
    }
    getTwitterIcon(state) {
        const { threadDetail } = this.apiState;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["twitter:site"] !== "";
        const href = active ? `${define_1.default.URL.twitter}${serverMetas["twitter:site"].replace("@", "")}` : "";
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getTwitter({}, state, { active, href, onClick });
    }
    getFacebookIcon(state) {
        const { threadDetail } = this.apiState;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["fb:page_id"] !== "";
        const href = active ? `${define_1.default.URL.facebook}${serverMetas["fb:page_id"]}` : "";
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getFacebook({}, state, { active, href, onClick });
    }
    getAppstoreIcon(state) {
        const { threadDetail } = this.apiState;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["al:ios:app_store_id"] !== "";
        const href = active ? `${define_1.default.URL.appstore}${serverMetas["al:ios:app_store_id"]}` : "";
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getAppstore({}, state, { active, href, onClick });
    }
    getAndroidIcon(state) {
        const { threadDetail } = this.apiState;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["al:android:package"] !== "";
        const href = active ? `${define_1.default.URL.playstore}${serverMetas["al:android:package"]}` : "";
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getAndroid({}, state, { active, href, onClick });
    }
    getHomeIcon(state) {
        const { threadDetail } = this.apiState;
        const { ui } = state;
        const { protocol, ch, hasSlash } = threadDetail;
        const active = true;
        let href = `${Sequence_1.default.HTTPS_PROTOCOL}//${conf_1.default.domain}${ch}`;
        if (protocol !== Sequence_1.default.TALKN_PROTOCOL) {
            if (hasSlash && ch.lastIndexOf("/") === ch.length - 1) {
                href = `${protocol}/${ch}`.replace(/\/$/, "");
            }
            else {
                href = `${protocol}/${ch}`;
            }
        }
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getHome({}, state, { active, href, onClick });
    }
    getTalknIcon(clientState) {
        const { threadDetail } = this.apiState;
        const { ui } = clientState;
        const { ch } = threadDetail;
        const active = true;
        const href = `${Sequence_1.default.HTTPS_PROTOCOL}//${conf_1.default.domain}${ch}`;
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getTalkn({}, clientState, { active, href, onClick });
    }
    getDispContentType(contentType) {
        const { style } = this.props.clientState;
        if (contentType) {
            return contentType.split(";").map((c, i) => (react_1.default.createElement("div", { key: `${c}_${i}`, style: style.detail.metaContentType }, c)));
        }
        return "";
    }
    renderMeta() {
        const { threadDetail } = this.apiState;
        const { clientState } = this.props;
        const { style } = clientState;
        const { serverMetas, contentType, h1s, protocol } = threadDetail;
        style.detail.img = this.getImgStyle(clientState, style, protocol, serverMetas);
        const description = this.getDescription(serverMetas);
        const TwitterIcon = this.getTwitterIcon(clientState);
        const FacebookIcon = this.getFacebookIcon(clientState);
        const AppstoreIcon = this.getAppstoreIcon(clientState);
        const AndroidIcon = this.getAndroidIcon(clientState);
        const HomeIcon = this.getHomeIcon(clientState);
        const TalknIcon = this.getTalknIcon(clientState);
        const GraphIcon = Icon_1.default.getGraph({}, clientState, { active: false });
        const EmptyIcon = Icon_1.default.getEmpty({}, clientState, { active: false });
        const dispContentType = this.getDispContentType(contentType);
        return (react_1.default.createElement("div", { "data-component-name": "DetaiMeta", style: style.detail.meta },
            react_1.default.createElement("div", { style: style.detail.img }),
            react_1.default.createElement("div", { style: style.detail.description }, description),
            react_1.default.createElement(EmotionGraph_1.default, Object.assign({}, this.props)),
            react_1.default.createElement("div", { style: style.detail.metaItems },
                TwitterIcon,
                FacebookIcon,
                AppstoreIcon,
                AndroidIcon),
            react_1.default.createElement("div", { style: style.detail.metaItems },
                HomeIcon,
                TalknIcon,
                GraphIcon,
                EmptyIcon),
            react_1.default.createElement("div", { style: style.detail.metaContentTypeWrap }, dispContentType)));
    }
    renderCh() {
        const { threadDetail } = this.apiState;
        const { clientState } = this.props;
        const { style } = clientState;
        const IconUpdate = Icon_1.default.getUpdate(style.icon.update);
        return (react_1.default.createElement("div", { style: style.detail.ch },
            "CH",
            react_1.default.createElement("br", null),
            threadDetail.ch,
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { onClick: this.handleOnClickUpdate, style: style.detail.updateWrap },
                react_1.default.createElement("div", { style: style.detail.update },
                    "UPDATE",
                    IconUpdate))));
    }
    renderAnalyze() {
        const { clientState } = this.props;
        const { threadDetail } = this.apiState;
        const { style } = clientState;
        return (react_1.default.createElement("div", { style: style.detail.analyze },
            react_1.default.createElement("div", { style: style.detail.analyzeRow },
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "LIVE"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, threadDetail.watchCnt)),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "POSITIBITY"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "1.5")),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "GROWTH"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "2.0%"))),
            react_1.default.createElement("div", { style: style.detail.analyzeRow },
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "TOTAL POST"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, threadDetail.postCnt)),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "AD POWER"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "102")),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "RANK"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "2"))),
            react_1.default.createElement("div", { style: style.detail.analyzeRow },
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "LIKE"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, threadDetail.postCnt)),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "SHARE"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "12")),
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "MONEY"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, "13200")))));
    }
    renderH1s() {
        const { threadDetail } = this.apiState;
        const { style } = this.props.clientState;
        const liTags = threadDetail.h1s.map((h1, i) => {
            return (react_1.default.createElement("li", { style: style.detail.h1sLi, key: `h1s${i}` },
                "\u30FB",
                h1));
        });
        return react_1.default.createElement("ol", { style: style.detail.h1s }, liTags);
    }
    renderLockMenu() {
        const { ui } = this.props.clientState;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
            case Ui_1.default.screenModeMiddleLabel:
                return react_1.default.createElement(LockMenu_1.default, Object.assign({}, this.props));
            case Ui_1.default.screenModeLargeLabel:
                return null;
        }
    }
    renderDetailFooter() {
        const { ui } = this.props.clientState;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                return react_1.default.createElement(DetailFooter_1.default, Object.assign({}, this.props));
        }
    }
    renderExtension() {
        const { clientState } = this.props;
        const { ui } = clientState;
        const active = true;
        const href = "https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en";
        const onClick = ui.extensionMode !== "NONE"
            ? () => {
                window.talknWindow.parentExtTo("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getChromeExtension({}, clientState, { active, href, onClick });
    }
    render() {
        const { style } = this.props.clientState;
        return (react_1.default.createElement("div", { "data-component-name": "Detail", style: style.detail.self },
            this.renderHeader(),
            react_1.default.createElement("div", { "data-component-name": "DetailBody", style: style.detail.body },
                this.renderMeta(),
                this.renderExtension(),
                this.renderCh(),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null)),
            this.renderLockMenu(),
            this.renderDetailFooter()));
    }
}
exports.default = Detail;
//# sourceMappingURL=Detail.js.map