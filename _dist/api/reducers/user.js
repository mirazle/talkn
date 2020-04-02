"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("api/store/User"));
exports.default = (state = new User_1.default(), action) => {
    return action.user ? state.merge(action.user) : state;
};
//# sourceMappingURL=user.js.map