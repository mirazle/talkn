"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Thread_1 = __importDefault(require("api/store/Thread"));
const Ch_1 = __importDefault(require("client/style/Menu/common/Ch"));
const Icon_1 = __importDefault(require("client/components/Icon"));
const MarqueeArea_1 = __importDefault(require("client/container/util/MarqueeArea"));
class ChComponent extends MarqueeArea_1.default {
    constructor(props) {
        super(props);
        this.state = {
            animationStyle: props.animationStyle,
            ...this.superState,
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getDecolationEvents = this.getDecolationEvents.bind(this);
    }
    componentDidMount() {
        const { ch } = this.props;
        this.measureText();
        this.api("onResponseChAPI", ch);
    }
    componentWillUnmount() {
        const { ch } = this.props;
        this.clearTimeout();
    }
    componentDidUpdate(beforeProps) {
        if (this.props.isActive !== beforeProps.isActive) {
            this.setState({
                animationStyle: {
                    ...this.state.animationStyle,
                    background: this.props.animationStyle.background,
                },
            });
        }
        this.measureText();
    }
    getDecolationEvents(isActive) {
        const styleKey = isActive ? Ch_1.default.activeLiSelfLabel : Ch_1.default.unactiveLiSelfLabel;
        if (!isActive) {
            return {
                onMouseOver: () => {
                    this.onMouseOverArea();
                    this.setState({
                        animationStyle: {
                            ...this.state.animationStyle,
                            background: Ch_1.default[`${styleKey}MouseOverBackground`],
                        },
                    });
                },
                onMouseLeave: () => {
                    this.onMouseLeaveArea();
                    this.setState({
                        animationStyle: {
                            ...this.state.animationStyle,
                            background: Ch_1.default[`${styleKey}Background`],
                        },
                    });
                },
            };
        }
    }
    handleOnClick() {
        const { ch } = this.props;
        this.props.handleOnClick(ch);
    }
    render() {
        const { animationStyle } = this.state;
        const { isActive, ch, title, favicon, type, post, stampId, liveCntNode, rankNum, style } = this.props;
        const dispType = type === Thread_1.default.findTypeHtml || type === Thread_1.default.findTypeAll ? null : type;
        const marqueeStyle = this.getMarqueeStyle();
        return (react_1.default.createElement("li", Object.assign({ key: ch, "data-component-name": "Ch", style: animationStyle, onClick: this.handleOnClick }, this.getDecolationEvents(isActive)),
            this.renderRank(rankNum, ch),
            react_1.default.createElement("div", { style: style.upper },
                react_1.default.createElement("span", { style: style.upperSpace }),
                react_1.default.createElement("span", { ref: this.marqueeWrapRef, "data-component-name": "MarqueeMenuIndex", style: style.upperRight },
                    react_1.default.createElement("span", { ref: this.marqueeTextRef, style: marqueeStyle }, title))),
            react_1.default.createElement("div", { style: style.bottom },
                react_1.default.createElement("span", { style: { ...style.bottomIcon, backgroundImage: `url( ${favicon} )` } }),
                react_1.default.createElement("span", { style: style.bottomPost, dangerouslySetInnerHTML: { __html: this.renderPost(post, stampId) } }),
                liveCntNode),
            dispType && react_1.default.createElement("span", { style: style[`ext${dispType}`] }, dispType)));
    }
    renderPost(post, stampId) {
        if (stampId > 0) {
            post = Icon_1.default.getStampStr(post, stampId, false);
        }
        return post;
    }
    renderRank(rankNum, ch) {
        const disp = rankNum ? `RANK${rankNum}` : "TUNE";
        const upperRankWrap = Ch_1.default.getUpperRankWrap();
        const upperRank = Ch_1.default.getUpperRank();
        const background = Ch_1.default.getDispRankBackground(rankNum);
        const width = Ch_1.default.getDispRankWidth(rankNum);
        return (react_1.default.createElement("span", { style: { ...upperRankWrap, background, width } },
            react_1.default.createElement("span", { style: upperRank }, disp)));
    }
}
exports.default = ChComponent;
//# sourceMappingURL=Ch.js.map