"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const FPS = 60;
const STEP = 1;
const TIMEOUT = (1 / FPS) * 1000;
class Marquee extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedWidth: 0,
            overflowWidth: 0,
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    componentDidMount() {
        this._measureText();
        if (this.props.hoverToStop) {
            this._startAnimation();
        }
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.text !== nextProps.text) {
            return true;
        }
        if (this.state.overflowWidth === 0) {
            return false;
        }
        return true;
    }
    componentDidUpdate() {
        this._measureText();
        if (this.props.hoverToStop) {
            this._startAnimation();
        }
    }
    componentWillUnmount() {
        clearTimeout(this._marqueeTimer);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props && this.props.text && this.props.text !== "" && this.props.text.length !== nextProps.text.length) {
            clearTimeout(this._marqueeTimer);
            this.setState({
                animatedWidth: 0,
            });
        }
    }
    handleMouseEnter() {
        if (this.props.hoverToStop) {
            clearTimeout(this._marqueeTimer);
        }
        else if (this.state.overflowWidth > 0) {
            this._startAnimation();
        }
    }
    handleMouseLeave() {
        if (this.props.hoverToStop && this.state.overflowWidth > 0) {
            this._startAnimation();
        }
        else {
            clearTimeout(this._marqueeTimer);
            this.setState({
                animatedWidth: 0,
            });
        }
    }
    render() {
        const style = {
            ...{
                position: "relative",
                right: this.state.animatedWidth,
                whiteSpace: "nowrap",
            },
            ...this.props.style,
        };
        if (this.state.overflowWidth < 0) {
            return (react_1.default.createElement("div", { "data-component-name": "Marquee", className: `ui-marquee ${this.props.className}`, style: { overflow: "hidden" } },
                react_1.default.createElement("span", { ref: "text", style: style }, this.props.text)));
        }
        else {
            return (react_1.default.createElement("div", { "data-component-name": "Marquee", className: `ui-marquee ${this.props.className}`, style: { overflow: "hidden" }, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
                react_1.default.createElement("span", { ref: "text", style: style }, this.props.text)));
        }
    }
    _startAnimation() {
        clearTimeout(this._marqueeTimer);
        const isLeading = this.state.animatedWidth === 0;
        const timeout = isLeading ? this.props.leading : TIMEOUT;
        const animate = () => {
            const { overflowWidth } = this.state;
            let animatedWidth = this.state.animatedWidth + STEP;
            const isRoundOver = animatedWidth > overflowWidth;
            if (isRoundOver) {
                if (this.props.loop) {
                    animatedWidth = 0;
                }
                else {
                    return;
                }
            }
            if (isRoundOver && this.props.trailing) {
                this._marqueeTimer = setTimeout(() => {
                    this.setState({
                        animatedWidth,
                    });
                    this._marqueeTimer = setTimeout(animate, TIMEOUT);
                }, this.props.trailing);
            }
            else {
                this.setState({
                    animatedWidth,
                });
                this._marqueeTimer = setTimeout(animate, TIMEOUT);
            }
        };
        this._marqueeTimer = setTimeout(animate, timeout);
    }
    _measureText() {
        const container = react_dom_1.default.findDOMNode(this);
        const node = react_dom_1.default.findDOMNode(this.refs.text);
        if (container && node) {
            const containerWidth = container.offsetWidth;
            const textWidth = node.offsetWidth;
            const overflowWidth = textWidth - containerWidth;
            if (overflowWidth !== this.state.overflowWidth) {
                this.setState({
                    overflowWidth,
                });
            }
        }
    }
}
exports.default = Marquee;
//# sourceMappingURL=Marquee.js.map