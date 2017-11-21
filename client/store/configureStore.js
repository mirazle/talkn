import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers'
import createLogger from 'redux-logger';
import ws from '../middlewares/ws';

//import persistState, { mergePersistedState } from 'redux-localstorage';
//import sessionStorageAdapter from 'redux-localstorage/lib/adapters/sessionStorage';
//import localStorageAdapter from 'redux-localstorage/lib/adapters/localStorage';
//import reduxLocalstorageFilter from 'redux-localstorage-filter';

export default function configureStore( initialState ) {

	const logger = createLogger();
	const store = createStore(
		rootReducer,
		applyMiddleware( thunk, ws, promise )
//		applyMiddleware( thunk, ws, promise, logger )
	)

	if ( module.hot ) {

		module.hot.accept( '../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer( nextReducer )
		})
	}
	return store
}
