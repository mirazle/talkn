"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const common_1 = require("client/style/common");
exports.Label = (props) => (react_1.default.createElement("label", { style: common_1.LabelStyle, htmlFor: props.htmlFor }, props.htmlFor));
//# sourceMappingURL=index.js.map