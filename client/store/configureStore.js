import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import define from 'common/define'
import conf from 'client/conf/'
import rootReducer from 'client/reducers'
import middleware from 'client/middleware/'

export default function configureStore( initialState ={} ) {

	let composeEnhancers;
	let middlewares = [];

	if( conf.env === define.DEVELOPMENT ){
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null;
		const logger = createLogger({collapsed: true, duration: true});
		middlewares = [ logger, middleware.updateAction ];
	}

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers ?	
			composeEnhancers(applyMiddleware(...middlewares)) :
			applyMiddleware(...middlewares)
	);

	if ( module.hot ) {
		module.hot.accept( '../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer( nextReducer )
		})
	}
	return store;
}
