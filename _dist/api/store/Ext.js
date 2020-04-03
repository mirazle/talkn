"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class Ext extends Schema_1.default {
    constructor(params = {}) {
        super();
        const mode = params && params.mode ? params.mode : "NONE";
        const openHeight = params && params.openHeight ? params.openHeight : 0;
        const closeHeight = params && params.closeHeight ? params.closeHeight : 0;
        return this.create({
            mode,
            openHeight,
            closeHeight
        });
    }
}
exports.default = Ext;
//# sourceMappingURL=Ext.js.map