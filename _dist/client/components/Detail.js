"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const conf_1 = __importDefault(require("client/conf"));
const define_1 = __importDefault(require("common/define"));
const Sequence_1 = __importDefault(require("api/Sequence"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
const DetailFooter_1 = __importDefault(require("client/components/DetailFooter"));
const EmotionGraph_1 = __importDefault(require("client/components/EmotionGraph"));
const LockMenu_1 = __importDefault(require("client/components/LockMenu"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const Container_1 = __importDefault(require("client/style/Container"));
class Detail extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { style } = props.state;
        this.state = {
            metaStyle: style.detail.meta,
            chStyle: style.detail.ch,
        };
        this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
        this.getMetaDecolationProps = this.getMetaDecolationProps.bind(this);
        this.getChDecolationProps = this.getChDecolationProps.bind(this);
    }
    getMetaDecolationProps() {
        return {
            onMouseOver: () => {
                this.setState({
                    metaStyle: {
                        ...this.state.metaStyle,
                        background: Container_1.default.whiteRGBA,
                    },
                });
            },
            onMouseLeave: () => {
                this.setState({
                    metaStyle: {
                        ...this.state.metaStyle,
                        background: Container_1.default.lightRGBA,
                    },
                });
            },
        };
    }
    getChDecolationProps() {
        return {
            onMouseOver: () => {
                this.setState({
                    chStyle: {
                        ...this.state.chStyle,
                        background: Container_1.default.whiteRGBA,
                    },
                });
            },
            onMouseLeave: () => {
                this.setState({
                    chStyle: {
                        ...this.state.chStyle,
                        background: Container_1.default.lightRGBA,
                    },
                });
            },
        };
    }
    handleOnClickLike() {
        const { state, onClickOpenLockMenu } = this.props;
        const { ui } = state;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            this.clientAction("OPEN_INNER_NOTIF");
        }
    }
    handleOnClickShare() {
        const { state, onClickOpenLockMenu } = this.props;
        const { ui } = state;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
        else {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelShare);
        }
    }
    handleOnClickPortal() {
        const { state, onClickOpenLockMenu } = this.props;
        const { ui } = state;
        if (ui.openLockMenu !== Ui_1.default.openLockMenuLabelNo) {
            onClickOpenLockMenu(Ui_1.default.openLockMenuLabelNo);
        }
    }
    handleOnClickUpdate() {
        const { threadDetail } = this.props.state;
        this.clientAction("OPEN_INNER_NOTIF", { ui: { openInnerNotif: "Update thread data." } });
        this.api("updateThread", threadDetail.ch);
    }
    getImgStyle(state, style, protocol, serverMetas) {
        const { threadDetail } = this.props.state;
        let backgroundImage = style.detail.img.backgroundImage;
        let backgroundSize = style.detail.img.backgroundSize;
        switch (threadDetail.findType) {
            default:
            case Thread_1.default.findTypeHtml:
                if (serverMetas && serverMetas["og:image"]) {
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
        return { ...style.detail.img, backgroundImage, backgroundSize };
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
    render() {
        const { style } = this.props.state;
        return (react_1.default.createElement("div", { "data-component-name": "Detail", style: style.detail.self },
            this.renderHeader(),
            react_1.default.createElement("div", { "data-component-name": "DetailBody", style: style.detail.body },
                this.renderImage(),
                this.renderMeta(),
                this.renderExtension(),
                this.renderCh(),
                react_1.default.createElement("div", { "data-component-name": "Detail-space", style: style.detail.space })),
            this.renderLockMenu(),
            this.renderDetailFooter()));
    }
    renderHeader() {
        const { state, handleOnClickToggleDetail } = this.props;
        const { style, threadDetail } = state;
        if (threadDetail && threadDetail["title"]) {
            return (react_1.default.createElement("header", { "data-component-name": "DetailHeader", onClick: handleOnClickToggleDetail, style: style.detail.header },
                react_1.default.createElement("span", { style: style.detail.headerP },
                    react_1.default.createElement(Marquee_1.default, { text: threadDetail.serverMetas["title"], loop: true, hoverToStop: false, trailing: 0, leading: 0 }))));
        }
        else {
            return undefined;
        }
    }
    renderImage() {
        const { state } = this.props;
        const { threadDetail, style } = state;
        const { serverMetas, protocol } = threadDetail;
        style.detail.img = this.getImgStyle(state, style, protocol, serverMetas);
        return react_1.default.createElement("div", { style: style.detail.img });
    }
    renderMeta() {
        const { metaStyle } = this.state;
        return (react_1.default.createElement("div", Object.assign({ "data-component-name": "DetaiMeta", style: metaStyle }, this.getMetaDecolationProps()),
            this.renderDescription(),
            react_1.default.createElement(EmotionGraph_1.default, Object.assign({}, this.props)),
            this.renderIcons(),
            this.renderContentTypes()));
    }
    renderDescription() {
        const { state } = this.props;
        const { threadDetail, style } = state;
        const { serverMetas } = threadDetail;
        const description = this.getDescription(serverMetas);
        return (react_1.default.createElement("div", { "data-component-name": "Detail-description", style: style.detail.description }, description));
    }
    renderIcons() {
        const { state } = this.props;
        const { style } = state;
        const TwitterIcon = Icons.getTwitterIcon(state);
        const FacebookIcon = Icons.getFacebookIcon(state);
        const AppstoreIcon = Icons.getAppstoreIcon(state);
        const AndroidIcon = Icons.getAndroidIcon(state);
        const HomeIcon = Icons.getHomeIcon(state);
        const TalknIcon = Icons.getTalknIcon(state);
        const GraphIcon = Icon_1.default.getGraph(state, {}, { active: false });
        const EmptyIcon = Icon_1.default.getEmpty(state, {}, { active: false });
        return (react_1.default.createElement("div", { "data-component-name": "Detail-icons" },
            react_1.default.createElement("div", { style: style.detail.metaItems },
                TwitterIcon,
                FacebookIcon,
                AppstoreIcon,
                AndroidIcon),
            react_1.default.createElement("div", { style: style.detail.metaItems },
                HomeIcon,
                TalknIcon,
                GraphIcon,
                EmptyIcon)));
    }
    renderContentTypes() {
        const { state } = this.props;
        const { threadDetail, style } = state;
        const { contentType } = threadDetail;
        if (contentType) {
            const contentTypes = contentType.split(";").map((c, i) => (react_1.default.createElement("div", { key: `${c}_${i}`, style: style.detail.metaContentType }, c)));
            return react_1.default.createElement("div", { style: style.detail.metaContentTypeWrap }, contentTypes);
        }
        return undefined;
    }
    renderCh() {
        const { chStyle } = this.state;
        const { state } = this.props;
        const { style, threadDetail } = state;
        const IconUpdate = Icon_1.default.getUpdate(style.icon.update);
        return (react_1.default.createElement("div", Object.assign({ "data-component-name": "Detail-ch", style: chStyle }, this.getChDecolationProps()),
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
        const { state } = this.props;
        const { style, threadDetail } = state;
        return (react_1.default.createElement("div", { style: style.detail.analyze },
            react_1.default.createElement("div", { style: style.detail.analyzeRow },
                react_1.default.createElement("div", { style: style.detail.analyzeCol },
                    react_1.default.createElement("div", { style: style.detail.analyzeLabel }, "LIVE"),
                    react_1.default.createElement("hr", { style: style.detail.analyzeHr }),
                    react_1.default.createElement("div", { style: style.detail.analyzeValue }, threadDetail.liveCnt)),
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
        const { threadDetail, style } = this.props.state;
        const liTags = threadDetail.h1s.map((h1, i) => {
            return (react_1.default.createElement("li", { style: style.detail.h1sLi, key: `h1s${i}` },
                "\u30FB",
                h1));
        });
        return react_1.default.createElement("ol", { style: style.detail.h1s }, liTags);
    }
    renderLockMenu() {
        const { ui } = this.props.state;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
            case Ui_1.default.screenModeMiddleLabel:
                return react_1.default.createElement(LockMenu_1.default, Object.assign({}, this.props));
            case Ui_1.default.screenModeLargeLabel:
                return null;
        }
    }
    renderDetailFooter() {
        const { ui } = this.props.state;
        switch (ui.screenMode) {
            case Ui_1.default.screenModeSmallLabel:
            case Ui_1.default.screenModeMiddleLabel:
            case Ui_1.default.screenModeLargeLabel:
                return react_1.default.createElement(DetailFooter_1.default, Object.assign({}, this.props));
        }
    }
    renderExtension() {
        const { state } = this.props;
        const { ui } = state;
        const active = true;
        const href = "https://chrome.google.com/webstore/detail/talkn-for-chrome/dkngnmdlcofambpfaccepbnjgfholgbo?hl=en";
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getChromeExtension({}, state, { active, href, onClick });
    }
}
exports.default = Detail;
class Icons {
    static getTwitterIcon(state) {
        const { threadDetail, ui } = state;
        const { serverMetas } = threadDetail;
        const active = serverMetas && serverMetas["twitter:site"] && serverMetas["twitter:site"] !== "";
        const href = active ? `${define_1.default.URL.twitter}${serverMetas["twitter:site"].replace("@", "")}` : "";
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getTwitter(state, {}, { active, href, onClick });
    }
    static getFacebookIcon(state) {
        const { threadDetail } = state;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["fb:page_id"] !== "";
        const href = active ? `${define_1.default.URL.facebook}${serverMetas["fb:page_id"]}` : "";
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getFacebook(state, {}, { active, href, onClick });
    }
    static getAppstoreIcon(state) {
        const { threadDetail } = state;
        const { serverMetas } = threadDetail;
        const { ui } = state;
        const active = serverMetas && serverMetas["al:ios:app_store_id"] !== "";
        const href = active ? `${define_1.default.URL.appstore}${serverMetas["al:ios:app_store_id"]}` : "";
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getAppstore(state, {}, { active, href, onClick });
    }
    static getAndroidIcon(state) {
        const { ui, threadDetail } = state;
        const { serverMetas } = threadDetail;
        const active = serverMetas && serverMetas["al:android:package"] !== "";
        const href = active ? `${define_1.default.URL.playstore}${serverMetas["al:android:package"]}` : "";
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getAndroid(state, {}, { active, href, onClick });
    }
    static getHomeIcon(state) {
        const { threadDetail, ui } = state;
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
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getHome(state, {}, { active, href, onClick });
    }
    static getTalknIcon(state) {
        const { threadDetail, ui } = state;
        const { ch } = threadDetail;
        const active = true;
        const href = `${Sequence_1.default.HTTPS_PROTOCOL}//${conf_1.default.domain}${ch}`;
        const onClick = ui.extensionMode !== Ui_1.default.extensionModeExtNoneLabel
            ? () => {
                window.talknWindow.ext.to("linkTo", { href });
            }
            : () => { };
        return Icon_1.default.getTalkn(state, {}, { active, href, onClick });
    }
}
//# sourceMappingURL=Detail.js.map