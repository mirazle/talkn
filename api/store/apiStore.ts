import { applyMiddleware, createStore } from "redux";
import apiReducers from "api/reducers";
import middleware from "api/middleware/";

declare global {
  interface Module {
    hot: any;
  }
}

export default function apiStore(initialState = {}) {
  let composeEnhancers = null;
  let middlewares = [middleware.updateAction];
  const store = createStore(
    apiReducers,
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
