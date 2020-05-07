import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducers from "client/reducers";
import conf from "common/conf";
import define from "common/define";
import middleware from "client/middleware/";

export default function clientStore(initialState = {}) {
  let composeEnhancers = null;
  let middlewares = [middleware.updateAction];
  if (conf.env === define.DEVELOPMENT) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
    middlewares.push(createLogger({ collapsed: true, duration: true }));
  }
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
  );

  return store;
}
