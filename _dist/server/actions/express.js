"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("server/listens/express"));
exports.default = {
    setUp: async () => {
        const express = new express_1.default();
        express.createHttpServer();
        express.createHttpsServer();
    }
};
//# sourceMappingURL=express.js.map