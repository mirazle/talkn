"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("./Ui"));
const UiTimeMarker_1 = __importDefault(require("./UiTimeMarker"));
const Style_1 = __importDefault(require("./Style"));
const ActionLogs_1 = __importDefault(require("./ActionLogs"));
class ClientState {
    constructor(params) {
        this.ui = new Ui_1.default(params);
        this.uiTimeMarker = new UiTimeMarker_1.default(params);
        this.style = new Style_1.default(params);
        this.actionLog = new ActionLogs_1.default();
    }
    static getUiParams(thread, bootOption, caches) {
        return Object.assign(Object.assign({ isTransition: true, rootTitle: thread.title }, bootOption), thread);
    }
}
exports.default = ClientState;
//# sourceMappingURL=index.js.map