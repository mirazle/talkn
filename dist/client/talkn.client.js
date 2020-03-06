"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TalknWindow_1 = __importDefault(require("client/operations/TalknWindow"));
const TalknSetup_1 = __importDefault(require("client/operations/TalknSetup"));
TalknSetup_1.default.setupMath();
const talknWindow = new TalknWindow_1.default();
if (!window.talknWindow)
    window.talknWindow = talknWindow;
//# sourceMappingURL=talkn.client.js.map