"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = __importDefault(require("client/mapToStateToProps/storage"));
const scroll_1 = __importDefault(require("client/mapToStateToProps/scroll"));
exports.default = (_state, _props) => {
    let state = _state;
    let props = _props;
    let uiResults = {};
    let storageResults = {};
    if (scroll_1.default[_state.actionLog[0]]) {
        uiResults = scroll_1.default[_state.actionLog[0]](_state, _props);
        state = uiResults.state;
        props = uiResults.props;
    }
    if (storage_1.default[_state.actionLog[0]]) {
        storageResults = storage_1.default[_state.actionLog[0]](state, props);
        state = storageResults.state;
        props = storageResults.props;
    }
    return { state };
};
//# sourceMappingURL=index.js.map