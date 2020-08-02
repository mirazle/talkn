"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("api/store/Schema"));
class BootOption extends Schema_1.default {
    constructor(bootOption = {}) {
        super();
        return this.create({ ...bootOption });
    }
    static rebuildAttributes(attributes) {
        let rebuildAttributesObj = {};
        Object.keys(attributes).forEach(i => {
            rebuildAttributesObj[attributes[i].name] = attributes[i].value;
        });
        return rebuildAttributesObj;
    }
}
exports.default = BootOption;
//# sourceMappingURL=BootOption.js.map