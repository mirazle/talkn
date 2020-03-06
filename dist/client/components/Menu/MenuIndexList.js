"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Ui_1 = __importDefault(require("api/store/Ui"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const util_1 = __importDefault(require("common/util"));
const conf_1 = __importDefault(require("common/conf"));
const MenuIndexList_1 = __importDefault(require("client/style/Menu/MenuIndexList"));
const Post_1 = __importDefault(require("client/style/Post"));
const MarqueeArea_1 = __importDefault(require("client/container/util/MarqueeArea"));
class MenuIndexListComponent extends MarqueeArea_1.default {
    constructor(props) {
        super(props);
        this.state = Object.assign({ style: props.style }, this.superState);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getDecolationEvents = this.getDecolationEvents.bind(this);
    }
    componentDidMount() {
        const { menuIndexList } = this.props;
        this.measureText();
        window.talknWindow.parentCoreApi("onCatchChApi", menuIndexList.ch);
    }
    componentWillUnmount() {
        this.clearTimeout();
    }
    componentDidUpdate() {
        this.measureText();
    }
    getDecolationEvents(styleKey) {
        if (styleKey === MenuIndexList_1.default.unactiveLiSelfLabel) {
            return {
                onMouseOver: () => {
                    this.onMouseOverArea();
                    this.setState({
                        style: Object.assign(Object.assign({}, this.state.style), { [styleKey]: Object.assign(Object.assign({}, this.state.style[styleKey]), { background: MenuIndexList_1.default[`${styleKey}MouseOverBackground`] }) })
                    });
                },
                onMouseLeave: () => {
                    this.onMouseLeaveArea();
                    this.setState({
                        style: Object.assign(Object.assign({}, this.state.style), { [styleKey]: Object.assign(Object.assign({}, this.state.style[styleKey]), { background: MenuIndexList_1.default[`${styleKey}Background`] }) })
                    });
                },
                onMouseDown: () => {
                    this.setState({
                        style: Object.assign(Object.assign({}, this.state.style), { [styleKey]: Object.assign(Object.assign({}, this.state.style[styleKey]), { background: MenuIndexList_1.default[`${styleKey}MouseDownBackground`] }) })
                    });
                },
                onMouseUp: () => {
                    this.setState({
                        style: Object.assign(Object.assign({}, this.state.style), { [styleKey]: Object.assign(Object.assign({}, this.state.style[styleKey]), { background: MenuIndexList_1.default[`${styleKey}MouseOverBackground`] }) })
                    });
                }
            };
        }
    }
    handleOnClick() {
        const { thread, menuIndexList, handleOnClickCh } = this.props;
        const { ch } = menuIndexList;
        const isFocusCh = thread.ch === ch ? true : false;
        const styleKey = isFocusCh ? MenuIndexList_1.default.activeLiSelfLabel : MenuIndexList_1.default.unactiveLiSelfLabel;
        let { ui } = this.props;
        if (isFocusCh) {
            if (ui.screenMode === Ui_1.default.screenModeSmallLabel) {
                window.talknWindow.parentCoreApi("onClickToggleDispMenu");
            }
        }
        else {
            handleOnClickCh(ch, null, "menuIndexList");
        }
        this.setState({
            style: Object.assign(Object.assign({}, this.state.style), { [styleKey]: Object.assign(Object.assign({}, this.state.style[styleKey]), { background: MenuIndexList_1.default[`${styleKey}Background`] }) })
        });
    }
    render() {
        const { style } = this.state;
        const { app, thread, menuIndexList, rank } = this.props;
        const isFocusCh = thread.ch === menuIndexList.ch ? true : false;
        const styleKey = isFocusCh ? MenuIndexList_1.default.activeLiSelfLabel : MenuIndexList_1.default.unactiveLiSelfLabel;
        const title = app.rootCh === menuIndexList.ch ? app.rootTitle : menuIndexList.title;
        const dispRank = this.renderRank(rank);
        const dispFavicon = this.renderDispFavicon();
        const dispWatchCnt = this.renderDispWatchCnt();
        const baseStyle = style[styleKey];
        const dispExt = menuIndexList.findType === Thread_1.default.findTypeHtml ? null : menuIndexList.findType;
        const marqueeStyle = this.getMarqueeStyle();
        return (react_1.default.createElement("li", Object.assign({ "data-component-name": "MenuIndexList", key: menuIndexList.ch, style: baseStyle, onClick: this.handleOnClick }, this.getDecolationEvents(styleKey)),
            dispRank,
            react_1.default.createElement("div", { style: style.upper },
                react_1.default.createElement("span", { style: style.upperSpace }),
                react_1.default.createElement("span", { ref: this.marqueeWrapRef, "data-component-name": "MarqueeMenuIndex", style: style.upperRight },
                    react_1.default.createElement("span", { ref: this.marqueeTextRef, style: marqueeStyle }, title))),
            react_1.default.createElement("div", { style: style.bottom },
                react_1.default.createElement("span", { style: Object.assign(Object.assign({}, style.bottomIcon), { backgroundImage: `url( ${dispFavicon} )` }) }),
                react_1.default.createElement("span", { style: style.bottomPost, dangerouslySetInnerHTML: {
                        __html: this.renderPost(menuIndexList, app)
                    } }),
                dispWatchCnt),
            dispExt && react_1.default.createElement("span", { style: style[`ext${dispExt}`] }, dispExt)));
    }
    renderPost(menuIndexList, app) {
        let { ch, post, stampId } = menuIndexList;
        if (stampId > 0) {
            post = Post_1.default.getStampTag(post, false);
        }
        return post;
    }
    renderDispFavicon() {
        const { isFocusCh } = this.state;
        const { thread, menuIndexList } = this.props;
        const defaultFavicon = Thread_1.default.getDefaultFavicon();
        if (isFocusCh) {
            if (menuIndexList.favicon === defaultFavicon) {
                if (thread.favicon === defaultFavicon) {
                    return `//${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(menuIndexList.favicon)}`;
                }
                else {
                    return `//${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(thread.favicon)}`;
                }
            }
            else {
                return `//${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(menuIndexList.favicon)}`;
            }
        }
        else {
            if (menuIndexList.favicon === defaultFavicon) {
                return `//${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(menuIndexList.favicon)}`;
            }
            else {
                return `//${conf_1.default.assetsIconPath}${util_1.default.getSaveFaviconName(menuIndexList.favicon)}`;
            }
        }
    }
    renderDispWatchCnt() {
        const { style } = this.state;
        const { menuIndexList } = this.props;
        if (menuIndexList.watchCnt === 0 || menuIndexList.watchCnt > 0) {
            return (react_1.default.createElement("span", { style: style.bottomWatchCnt },
                react_1.default.createElement("span", { style: style.bottomWatchCntWrap }, menuIndexList.watchCnt)));
        }
        else {
            return react_1.default.createElement("span", { style: style.bottomWatchCnt });
        }
    }
    renderRank(rank) {
        let { upperRankWrap, upperRank } = this.state.style;
        if (rank) {
            const background = MenuIndexList_1.default.getDispRankBackground(rank);
            const width = MenuIndexList_1.default.getDispRankWidth(rank);
            return (react_1.default.createElement("span", { style: Object.assign(Object.assign({}, upperRankWrap), { background, width }) },
                react_1.default.createElement("span", { style: upperRank },
                    "RANK",
                    rank)));
        }
        else if (rank === 0) {
            const background = MenuIndexList_1.default.getDispRankBackground(rank);
            const width = MenuIndexList_1.default.getDispRankWidth(rank);
            return (react_1.default.createElement("span", { style: Object.assign(Object.assign({}, upperRankWrap), { background, width }) },
                react_1.default.createElement("span", { style: upperRank }, "TUNE")));
        }
        else {
            return null;
        }
    }
    getDispCh(isFocusCh) {
        const { thread, menuIndexList } = this.props;
        if (isFocusCh) {
            return thread.ch;
        }
        else {
            if (menuIndexList.ch === "/") {
                return menuIndexList.ch.replace(thread.ch, "");
            }
            else if (!menuIndexList.ch) {
                return "";
            }
            else {
                return menuIndexList.ch.indexOf("//") === 0 ? menuIndexList.ch.replace("//", "/") : menuIndexList.ch;
            }
        }
    }
}
exports.default = MenuIndexListComponent;
//# sourceMappingURL=MenuIndexList.js.map