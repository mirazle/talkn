"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BootOption_1 = __importDefault(require("api/store/BootOption"));
exports.default = (state = new BootOption_1.default(), action) => {
    return action.bootOption ? state.merge(action.bootOption) : state;
};
//# sourceMappingURL=bootOption.js.map