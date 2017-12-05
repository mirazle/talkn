import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from 'client/reducers'
import ws from 'client/middlewares/ws';
import talknIndex from 'client/middlewares/talknIndex';

export default function configureStore( initialState ) {

	const logger = createLogger();
	const store = createStore(
		rootReducer,
//		applyMiddleware( thunk, promise )
		applyMiddleware( thunk, talknIndex, ws, promise, logger )
	)

	if ( module.hot ) {
		module.hot.accept( '../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer( nextReducer )
		})
	}
	return store
}
