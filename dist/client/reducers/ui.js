"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("api/store/Ui"));
exports.default = (state = new Ui_1.default(), action) => {
    return action.ui ? state.merge(action.ui) : state;
};
//# sourceMappingURL=ui.js.map