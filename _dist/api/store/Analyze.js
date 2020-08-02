"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class Analyze extends Schema_1.default {
    constructor(params = {}) {
        super();
        const liveCnt = 0;
        return this.create({ liveCnt });
    }
}
exports.default = Analyze;
//# sourceMappingURL=Analyze.js.map