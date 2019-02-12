import Threads from 'common/schemas/state/Threads';

export default ( state = new Threads() , action ) => {
	return action.threads ? state.merge( action.threads ) : state ;
};
