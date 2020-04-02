"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class Setting extends Schema_1.default {
    constructor(params = {}) {
        super();
        const client = params && params.client ? params.client : {};
        const common = params && params.common ? params.common : {};
        const server = params && params.server ? params.server : {};
        return this.create({
            client,
            common,
            server
        });
    }
}
exports.default = Setting;
//# sourceMappingURL=Setting.js.map