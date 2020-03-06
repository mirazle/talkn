"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const Detail_1 = __importDefault(require("client/components/Detail"));
const Detail_2 = __importDefault(require("client/style/Detail"));
class DetailRight extends TalknComponent_1.default {
    render() {
        this.props.clientState.style.detail.self = this.props.clientState.style.detail[`self${Detail_2.default.detailRightSelfKey}`];
        return react_1.default.createElement(Detail_1.default, Object.assign({}, this.props));
    }
}
exports.default = DetailRight;
//# sourceMappingURL=DetailRight.js.map