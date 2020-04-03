"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = [], action) => {
    return action.menuLogs ? Object.assign({}, action.menuLogs) : state;
};
//# sourceMappingURL=menuLogs.js.map