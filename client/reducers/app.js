import App from 'common/schemas/state/App';

export default ( state = new App() , action ) => {
	return action.app ? state.merge( action.app ) : state ;
};
