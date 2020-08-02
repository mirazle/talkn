"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ui_1 = __importDefault(require("./Ui"));
const ComponentDidMounts_1 = __importDefault(require("./ComponentDidMounts"));
const UiTimeMarker_1 = __importDefault(require("./UiTimeMarker"));
const Style_1 = __importDefault(require("./Style"));
const ActionLogs_1 = __importDefault(require("./ActionLogs"));
class ClientState {
    constructor(params) {
        this.ui = new Ui_1.default(params.ui);
        this.componentDidMounts = new ComponentDidMounts_1.default(params.componentDidMounts);
        this.uiTimeMarker = new UiTimeMarker_1.default(params.uiTimeMarker);
        this.style = new Style_1.default({ ...params, ui: this.ui });
        this.actionLog = new ActionLogs_1.default();
    }
}
exports.default = ClientState;
//# sourceMappingURL=index.js.map