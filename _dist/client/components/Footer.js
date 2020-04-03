"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const PostsFooter_1 = __importDefault(require("client/components/PostsFooter"));
const MenuFooter_1 = __importDefault(require("client/components/MenuFooter"));
const DetailFooter_1 = __importDefault(require("client/components/DetailFooter"));
class Footer extends TalknComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { clientState, handleOnClickToggleMain } = this.props;
        const { style } = clientState;
        return (react_1.default.createElement("footer", { "data-component-name": "Footer", style: style.footer.self },
            react_1.default.createElement(MenuFooter_1.default, Object.assign({}, this.props, { mode: "default" })),
            react_1.default.createElement(PostsFooter_1.default, Object.assign({}, this.props, { mode: "default", handleOnClickToggleMain: handleOnClickToggleMain })),
            react_1.default.createElement(DetailFooter_1.default, Object.assign({}, this.props, { mode: "default" }))));
    }
}
exports.default = Footer;
//# sourceMappingURL=Footer.js.map