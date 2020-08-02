"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const ui_1 = __importDefault(require("./ui"));
const setting_1 = __importDefault(require("./setting"));
const reducers_1 = require("api/reducers");
const uiTimeMarker_1 = __importDefault(require("client/reducers/uiTimeMarker"));
const style_1 = __importDefault(require("./style"));
const componentDidMounts_1 = __importDefault(require("./componentDidMounts"));
const actionLog_1 = __importDefault(require("./actionLog"));
const apiReducers = {};
const someReudcer = (key) => (state = {}, action) => {
    if (action[key]) {
        if (action[key].constructor.name === "Array") {
            return [...action[key]];
        }
        else {
            return { ...action[key] };
        }
    }
    else {
        return state;
    }
};
Object.keys(reducers_1.reducerFiles).forEach((key) => {
    apiReducers[key] = someReudcer(key);
});
const reducers = redux_1.combineReducers({
    ui: ui_1.default,
    uiTimeMarker: uiTimeMarker_1.default,
    style: style_1.default,
    componentDidMounts: componentDidMounts_1.default,
    actionLog: actionLog_1.default,
    setting: setting_1.default,
    ...apiReducers,
});
exports.default = reducers;
//# sourceMappingURL=index.js.map