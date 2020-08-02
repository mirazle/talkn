"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = [], action) => {
    if (action.componentDidMounts && typeof action.componentDidMounts === "string") {
        state.push(action.componentDidMounts);
    }
    return state;
};
//# sourceMappingURL=componentDidMounts.js.map