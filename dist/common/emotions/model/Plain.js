"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("common/emotions/index"));
class Plain {
    static get TYPES() {
        return [index_1.default.TYPES.LIKE];
    }
    static getSaveBalance(stampId) {
        const balance = {
            1: [{ [index_1.default.TYPES.LIKE.ID]: 1 }]
        };
        return balance[stampId] ? balance[stampId] : null;
    }
    static getSchemas() {
        let schemas = {};
        Plain.TYPES.forEach((obj, i) => {
            schemas[obj.LABEL] = { type: Number, default: 0, min: 0 };
        });
        return schemas;
    }
}
exports.default = Plain;
//# sourceMappingURL=Plain.js.map