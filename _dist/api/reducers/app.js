"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("api/store/App"));
exports.default = (state = new App_1.default(), action) => {
    return action.app ? new App_1.default(action.app) : state;
};
//# sourceMappingURL=app.js.map