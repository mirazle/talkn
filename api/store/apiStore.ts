import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import reducers from "api/reducers";
import middleware from "api/middleware/";

declare global {
  interface Module {
    hot: any;
  }
}

export default function apiStore(initialState = {}) {
  let composeEnhancers = null;
  let middlewares = [middleware.updateAction];

  //if( conf.env === define.DEVELOPMENT ){
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
  middlewares.push(createLogger({ collapsed: true, duration: true }));
  //}

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers");
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
