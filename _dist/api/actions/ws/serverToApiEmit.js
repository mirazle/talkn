"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = __importDefault(require("api/Sequence"));
exports.default = response => {
    const type = `${Sequence_1.default.SERVER_TO_API_EMIT}${response.type}`;
    return { ...response, type };
};
//# sourceMappingURL=serverToApiEmit.js.map