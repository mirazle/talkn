import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import rootReducer from 'client/reducers'
import middleware from 'client/middleware/'

export default function configureStore( initialState ={} ) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
	const logger = createLogger({collapsed: true, duration: true});
	const middlewares = [ logger, middleware.updateDesc ];
	const store = createStore(
		rootReducer,
		initialState,
  	composeEnhancers(applyMiddleware(...middlewares))
	);

	if ( module.hot ) {
		module.hot.accept( '../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer( nextReducer )
		})
	}
	return store;
}
