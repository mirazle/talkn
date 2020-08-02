"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_redux_1 = require("react-redux");
const container_1 = __importDefault(require("client/container/"));
const Render = (dom, callback = () => { }) => {
    react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: dom.window.store },
        react_1.default.createElement(container_1.default, null)), document.querySelector(`div`), callback);
};
exports.default = Render;
//# sourceMappingURL=App.js.map