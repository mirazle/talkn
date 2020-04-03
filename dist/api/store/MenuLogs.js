"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class MenuLogs extends Schema_1.default {
    constructor(params = []) {
        super();
        params = params ? params : [];
        return this.create(params);
    }
}
exports.default = MenuLogs;
//# sourceMappingURL=MenuLogs.js.map