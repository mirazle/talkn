"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(require("api/store/Setting"));
exports.default = (state = new Setting_1.default(), action) => {
    return action.setting ? state.merge(action.setting) : state;
};
//# sourceMappingURL=setting.js.map