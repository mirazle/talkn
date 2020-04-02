"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
class TimeMarker extends TalknComponent_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        const { label, style, type } = this.props;
        return (react_1.default.createElement("li", { "data-component-name": `TimeMarker${type}`, style: style }, label));
    }
}
exports.default = TimeMarker;
//# sourceMappingURL=TimeMarker.js.map