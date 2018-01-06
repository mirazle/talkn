import Analyze from 'common/schemas/state/Analyze';

export default ( state = new Analyze() , action ) => {
	return action.analyze ? state.merge( action.analyze ) : state ;
};
