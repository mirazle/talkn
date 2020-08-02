"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Board_1 = __importDefault(require("client/style/Board"));
const Link_1 = __importDefault(require("client/style/Link"));
const Ch_1 = __importDefault(require("client/style/Menu/common/Ch"));
const Marquee_1 = __importDefault(require("client/container/util/Marquee"));
class Link extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { isActive, state } = props;
        const { link } = state.style;
        this.getEvents = this.getEvents.bind(this);
        this.state = {
            isActive,
            style: link.unactiveLi,
        };
    }
    getEvents(isActive) {
        const { style } = this.state;
        if (!isActive) {
            return {
                onClick: this.props.handleOnClick,
                onMouseOver: () => {
                    this.setState({
                        style: { ...style, background: Link_1.default.activeBgColor },
                    });
                },
                onMouseLeave: () => {
                    this.setState({
                        style: { ...style, background: Link_1.default.unactiveBgColor },
                    });
                },
            };
        }
        else {
            return {};
        }
    }
    render() {
        const { isActive, style } = this.state;
        const { text } = this.props;
        let { upperRankWrap, upperRank } = this.props.state.style.ch;
        const background = Ch_1.default.getDispRankBackground(0);
        const width = Board_1.default.tuneSize;
        if (isActive) {
            return (react_1.default.createElement("li", { style: this.props.state.style.link.tuneLi },
                react_1.default.createElement("span", { style: { ...upperRankWrap, background, width } },
                    react_1.default.createElement("span", { style: upperRank }, "TUNE")),
                react_1.default.createElement(Marquee_1.default, { text: text, loop: true, hoverToStop: false, trailing: 0, leading: 0 })));
        }
        else {
            return (react_1.default.createElement("li", Object.assign({ style: style }, this.getEvents(isActive)),
                react_1.default.createElement(Marquee_1.default, { text: text, loop: true, hoverToStop: false, trailing: 0, leading: 0 })));
        }
    }
}
exports.default = Link;
//# sourceMappingURL=Link.js.map