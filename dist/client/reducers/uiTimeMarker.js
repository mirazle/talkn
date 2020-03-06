"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UiTimeMarker_1 = __importDefault(require("api/store/UiTimeMarker"));
exports.default = (state = new UiTimeMarker_1.default(), action) => {
    return action.uiTimeMarker ? Object.assign({}, action.uiTimeMarker) : state;
};
//# sourceMappingURL=uiTimeMarker.js.map