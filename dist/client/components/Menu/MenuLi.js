"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Container_1 = __importDefault(require("client/style/Container"));
class MenuLi extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { style, isLast } = props;
        const liStyle = isLast ? style.menu.columnLast : style.menu.column;
        this.state = { style: liStyle };
        this.getDecolationProps = this.getDecolationProps.bind(this);
    }
    getDecolationProps() {
        const { isLast, app } = this.props;
        const styleKey = isLast ? "columnLast" : "column";
        return {
            onMouseOver: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { transition: Container_1.default.getTransitionFirstOn(app), transform: "scale( 1.05 )", cursor: "pointer" })
                });
            },
            onMouseLeave: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { transition: Container_1.default.getTransitionOn(app), transform: "scale( 1 )", cursor: "default" })
                });
            },
            onMouseDown: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { transform: "scale( 1 )", cursor: "pointer" })
                });
            },
            onMouseUp: () => {
                this.setState({
                    style: Object.assign(Object.assign({}, this.state.style), { transform: "scale( 1.05 )", cursor: "pointer" })
                });
            }
        };
    }
    render() {
        let { label, onClick } = this.props;
        const { style } = this.state;
        onClick = onClick ? onClick : () => { };
        return (react_1.default.createElement("li", Object.assign({ "data-component-name": "MenuLi", style: style, onClick: onClick }, this.getDecolationProps()), label));
    }
}
exports.default = MenuLi;
//# sourceMappingURL=MenuLi.js.map