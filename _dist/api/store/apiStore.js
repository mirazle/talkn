"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_logger_1 = require("redux-logger");
const reducers_1 = __importDefault(require("api/reducers"));
const middleware_1 = __importDefault(require("api/middleware/"));
function apiStore(initialState = {}) {
    let composeEnhancers = null;
    let middlewares = [middleware_1.default.updateAction];
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
    const logger = redux_logger_1.createLogger({ collapsed: true, duration: true });
    middlewares.push(logger);
    const store = redux_1.createStore(reducers_1.default, initialState, composeEnhancers ? composeEnhancers(redux_1.applyMiddleware(...middlewares)) : redux_1.applyMiddleware(...middlewares));
    if (module.hot) {
        module.hot.accept("../reducers", () => {
            const nextReducer = require("../reducers");
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
exports.default = apiStore;
//# sourceMappingURL=apiStore.js.map