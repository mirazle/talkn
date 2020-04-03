"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (state = [], action) => {
    return action.componentDidMount ? Object.assign({}, action.componentDidMount) : state;
};
//# sourceMappingURL=componentDidMounts.js.map