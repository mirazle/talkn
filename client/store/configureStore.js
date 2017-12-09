import { applyMiddleware, createStore } from 'redux'
//import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from 'client/reducers'

export default function configureStore( initialState ) {

	const logger = createLogger({collapsed: true, duration: true});
	const store = createStore(rootReducer, applyMiddleware( logger ));

	if ( module.hot ) {
		module.hot.accept( '../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer( nextReducer )
		})
	}
	return store
}
