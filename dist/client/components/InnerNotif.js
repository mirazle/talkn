"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const InnerNotif_1 = __importDefault(require("client/style/InnerNotif"));
class InnerNotif extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        const { innerNotif: style } = this.props.clientState.style;
        const notif = this.props.clientState.ui.openInnerNotif;
        this.state = { style, notif, isDebug: false };
    }
    componentWillReceiveProps(props) {
        const { ui } = this.props.clientState;
        const { style } = this.state;
        const height = props.state.style.innerNotif.self.height;
        const notif = ui.openInnerNotif;
        if (style.self.height !== height) {
            if (height === `${InnerNotif_1.default.selfHeight}px`) {
                setTimeout(props.closeInnerNotif, 3000);
            }
            this.setState({
                notif,
                style: Object.assign(Object.assign({}, style), { self: Object.assign(Object.assign({}, style.self), { height }) })
            });
        }
    }
    render() {
        const { style, notif, isDebug } = this.state;
        if (isDebug) {
            return react_1.default.createElement("div", { "data-component-name": "InnerNotif", style: style.self, dangerouslySetInnerHTML: { __html: notif } });
        }
        else {
            return (react_1.default.createElement("div", { "data-component-name": "InnerNotif", style: style.self }, notif));
        }
    }
}
exports.default = InnerNotif;
//# sourceMappingURL=InnerNotif.js.map