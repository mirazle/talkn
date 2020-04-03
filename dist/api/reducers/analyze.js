"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Analyze_1 = __importDefault(require("api/store/Analyze"));
exports.default = (state = new Analyze_1.default(), action) => {
    return action.analyze ? state.merge(action.analyze) : state;
};
//# sourceMappingURL=analyze.js.map