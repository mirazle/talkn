"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const react_dom_1 = __importDefault(require("react-dom"));
const FPS = 60;
const STEP = 1;
const TIMEOUT = (1 / FPS) * 1000;
class MarqueeArea extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.marqueeTextStyle = {
            position: "relative",
            transform: `translateX(0px)`,
            whiteSpace: "nowrap"
        };
        this.id = props.id;
        this.startAnimation = this.startAnimation.bind(this);
        this.measureText = this.measureText.bind(this);
        this.onMouseOverArea = this.onMouseOverArea.bind(this);
        this.onMouseLeaveArea = this.onMouseLeaveArea.bind(this);
    }
    get superState() {
        return {
            animatedWidth: 0,
            overflowWidth: 0
        };
    }
    get marqueeWrapRef() {
        return `MarqueeWrap${this.id}`;
    }
    get marqueeTextRef() {
        return `Marquee${this.id}`;
    }
    clearTimeout() {
        clearTimeout(this.marqueeTimer);
    }
    onMouseOverArea() {
        if (this.state.overflowWidth > 0) {
            this.startAnimation();
        }
    }
    onMouseLeaveArea() {
        this.clearTimeout();
        this.setState({
            animatedWidth: 0
        });
    }
    getMarqueeStyle() {
        return {
            position: "absolute",
            transform: `translateX(-${this.state.animatedWidth}px)`,
            whiteSpace: "nowrap"
        };
    }
    startAnimation() {
        this.clearTimeout();
        const animate = () => {
            const { overflowWidth } = this.state;
            let animatedWidth = this.state.animatedWidth + STEP;
            const isRoundOver = animatedWidth > overflowWidth;
            if (isRoundOver) {
                animatedWidth = 0;
            }
            this.setState({
                animatedWidth
            });
            this.marqueeTimer = setTimeout(animate, TIMEOUT);
        };
        this.marqueeTimer = setTimeout(animate, TIMEOUT);
    }
    measureText() {
        const container = react_dom_1.default.findDOMNode(this.refs[`MarqueeWrap${this.id}`]);
        const node = container.firstChild;
        if (container && node) {
            const containerWidth = container.offsetWidth;
            const textWidth = node.offsetWidth;
            const overflowWidth = textWidth - containerWidth;
            if (overflowWidth !== this.state.overflowWidth) {
                this.setState({
                    overflowWidth
                });
            }
        }
    }
}
exports.default = MarqueeArea;
//# sourceMappingURL=MarqueeArea.js.map