"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = {}, action) => {
    return action.thread ? Object.assign({}, action.thread) : state;
};
//# sourceMappingURL=thread.js.map