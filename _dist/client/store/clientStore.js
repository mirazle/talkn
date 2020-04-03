"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_logger_1 = require("redux-logger");
const reducers_1 = __importDefault(require("client/reducers"));
const conf_1 = __importDefault(require("common/conf"));
const define_1 = __importDefault(require("common/define"));
function clientStore(initialState = {}) {
    let composeEnhancers = null;
    let middlewares = [];
    if (conf_1.default.env === define_1.default.DEVELOPMENT) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
        middlewares.push(redux_logger_1.createLogger({ collapsed: true, duration: true }));
    }
    const store = redux_1.createStore(reducers_1.default, initialState, composeEnhancers ? composeEnhancers(redux_1.applyMiddleware(...middlewares)) : redux_1.applyMiddleware(...middlewares));
    return store;
}
exports.default = clientStore;
//# sourceMappingURL=clientStore.js.map