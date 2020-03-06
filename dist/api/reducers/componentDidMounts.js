"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = new Array(), action) => {
    return action.componentDidMounts && !state.includes(action.componentDidMounts)
        ? [...state, action.componentDidMounts]
        : state;
};
//# sourceMappingURL=componentDidMounts.js.map