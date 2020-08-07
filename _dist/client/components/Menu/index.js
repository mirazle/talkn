"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Ui_1 = __importDefault(require("client/store/Ui"));
const common_1 = require("client/components/common");
const Footer_1 = __importDefault(require("client/components/Menu/Footer"));
const Ch_1 = __importDefault(require("client/components/Menu/common/Ch"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const Ch_2 = __importDefault(require("client/style/Menu/common/Ch"));
class Menuextends extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.handleOnClickCh = this.handleOnClickCh.bind(this);
        this.renderTuneChLi = this.renderTuneChLi.bind(this);
        this.renderRankLi = this.renderRankLi.bind(this);
        this.renderSpaceLi = this.renderSpaceLi.bind(this);
    }
    componentDidMount() {
        this.clientAction("COMPONENT_DID_MOUNTS", { componentDidMounts: "Menu" });
    }
    handleOnClickCh(ch) {
        const { thread, ui } = this.props.state;
        const isFocusCh = thread.ch === ch;
        if (isFocusCh) {
            if (ui.screenMode === Ui_1.default.screenModeSmallLabel) {
                this.clientAction("ON_CLICK_TOGGLE_DISP_MENU");
            }
        }
        else {
            this.onClickCh(ch, ui, thread.hasSlash, "ch");
        }
    }
    render() {
        const { style, app } = this.props.state;
        const { onChangeFindType } = this.props;
        const { icon } = style;
        const IconTune = Icon_1.default.getTune(icon.tune);
        return (react_1.default.createElement("div", { "data-component-name": "Menu", onTransitionEnd: () => { }, style: style.menu.self },
            react_1.default.createElement("header", { style: style.ranks.header },
                react_1.default.createElement("div", { style: style.ranks.headerSearchIcon }, IconTune),
                react_1.default.createElement("div", { style: style.ranks.headerInput }, app.rootCh),
                react_1.default.createElement("div", { style: style.ranks.headerUpdateIcon },
                    react_1.default.createElement("select", { id: "ch", onChange: onChangeFindType, style: style.ranks.headerFindSelect },
                        react_1.default.createElement("option", null, Thread_1.default.findTypeAll),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeHtml),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeMusic),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeVideo),
                        react_1.default.createElement("option", null, Thread_1.default.findTypeOther)),
                    react_1.default.createElement(common_1.Label, { htmlFor: "ch" }))),
            react_1.default.createElement("ol", { style: style.ranks.ol },
                this.renderTuneChLi(),
                this.renderRankLi(),
                this.renderSpaceLi()),
            react_1.default.createElement(Footer_1.default, Object.assign({}, this.props))));
    }
    renderTuneChLi() {
        const { style, app, ui, tuneCh, thread } = this.props.state;
        if (app.tuned === "") {
            return undefined;
        }
        else {
            const isActive = thread.ch === tuneCh.ch;
            const tuneChStyle = isActive ? Ch_2.default.getActiveLiSelf({ app, ui }) : Ch_2.default.getUnactiveLiSelf({ app, ui });
            return (react_1.default.createElement(Ch_1.default, { key: `tune_${tuneCh.ch}`, isActive: isActive, ch: tuneCh.ch, title: tuneCh.title, favicon: tuneCh.favicon, type: tuneCh.findType, post: tuneCh.post, stampId: tuneCh.stampId, liveCntNode: Icon_1.default.getLiveCnt({ app, ui }, tuneCh.liveCnt), handleOnClick: this.handleOnClickCh, animationStyle: tuneChStyle, style: style.ch }));
        }
    }
    renderRankLi() {
        const { state } = this.props;
        const { app, thread, ranks } = state;
        const { ui, style } = state;
        return ranks.map((rank, rankNum) => {
            const isActive = thread.ch === rank.ch;
            const chStyle = isActive ? Ch_2.default.getActiveLiSelf({ app, ui }) : Ch_2.default.getUnactiveLiSelf({ app, ui });
            return (react_1.default.createElement(Ch_1.default, { key: `${rank.ch}_${rankNum + 1}`, rankNum: rankNum + 1, isActive: isActive, ch: rank.ch, title: rank.title, favicon: rank.favicon, type: rank.findType, post: rank.post, stampId: rank.stampId, liveCntNode: Icon_1.default.getLiveCnt({ app, ui }, rank.liveCnt), handleOnClick: this.handleOnClickCh, animationStyle: chStyle, style: style.ch }));
        });
    }
    renderSpaceLi() {
        const { style } = this.props.state;
        return react_1.default.createElement("li", { style: style.ch.space });
    }
    renderRank(rankNum, ch) {
        const upperRankWrap = Ch_2.default.getUpperRankWrap();
        const upperRank = Ch_2.default.getUpperRank();
        if (rankNum > 0) {
            const background = Ch_2.default.getDispRankBackground(rankNum);
            const width = Ch_2.default.getDispRankWidth(rankNum);
            return (react_1.default.createElement("span", { style: { ...upperRankWrap, background, width } },
                react_1.default.createElement("span", { style: upperRank },
                    "RANK",
                    rankNum)));
        }
        else {
            const background = Ch_2.default.getDispRankBackground();
            const width = Ch_2.default.getDispRankWidth();
            return (react_1.default.createElement("span", { style: { ...upperRankWrap, background, width } },
                react_1.default.createElement("span", { style: upperRank }, "TUNE")));
        }
    }
}
exports.default = Menuextends;
//# sourceMappingURL=index.js.map