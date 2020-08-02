"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = [], action) => {
    return action.type !== "COMPONENT_DID_MOUNTS" ? [action.type, ...state] : state;
};
//# sourceMappingURL=actionLog.js.map