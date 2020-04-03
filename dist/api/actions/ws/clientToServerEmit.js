"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequence_1 = __importDefault(require("api/Sequence"));
const index_1 = __importDefault(require("common/emotions/index"));
const emotions = new index_1.default();
let actions = {};
Object.keys(Sequence_1.default.map).forEach(endpoint => {
    const type = `${Sequence_1.default.CLIENT_TO_SERVER_EMIT}${endpoint}`;
    actions[type] = (reduxState, requestState, actionState) => {
        if (beforeFunctions[requestState.type]) {
            return beforeFunctions[requestState.type](reduxState, requestState, actionState);
        }
        return { requestState, actionState };
    };
});
const beforeFunctions = {
    post: (reduxState, requestState, actionState) => {
        const { app } = reduxState;
        if (app.isMediaCh) {
            if (window.talknMedia && window.talknMedia.currentTime) {
                requestState.app.inputCurrentTime = window.talknMedia.currentTime;
            }
            else {
                requestState.app.inputCurrentTime = 0;
            }
        }
        requestState.thread.emotions = {};
        if (app.inputStampId) {
            Object.keys(emotions.balances).forEach(balanceKey => {
                if (emotions.balances[balanceKey] && reduxState.thread.emotions[balanceKey]) {
                    const balance = emotions.balances[balanceKey](app.inputStampId);
                    if (balance) {
                        balance.forEach(b => {
                            const typeId = Object.keys(b)[0];
                            const typeLabel = emotions.idKeyTypes[typeId];
                            if (!requestState.thread.emotions[balanceKey])
                                requestState.thread.emotions[balanceKey] = {};
                            if (!requestState.thread.emotions[balanceKey][typeLabel])
                                requestState.thread.emotions[balanceKey][typeLabel] = 0;
                            requestState.thread.emotions[balanceKey][typeLabel] = b[typeId];
                        });
                    }
                }
            });
        }
        else {
            actionState.app = Object.assign({}, app);
            actionState.app.inputStampId = 0;
            requestState.app.inputStampId = 0;
        }
        return { requestState, actionState };
    }
};
exports.default = actions;
//# sourceMappingURL=clientToServerEmit.js.map