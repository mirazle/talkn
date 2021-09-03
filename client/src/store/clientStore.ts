import { applyMiddleware, createStore } from 'redux';

import middleware from 'client/middleware/';
import reducers from 'client/reducers';

export default function clientStore(initialState = {}) {
  let composeEnhancers = null;
  let middlewares = [middleware.updateAction];
  //if (conf.env !== define.PRODUCTION) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
  //　middlewares.push(createLogger({ collapsed: true, duration: true }));
  //}
  const store = createStore(reducers, initialState, composeEnhancers ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares));
  return store;
}
