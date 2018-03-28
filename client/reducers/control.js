import Control from 'common/schemas/state/Control';

export default ( state = new Control() , action ) => {
	return action.control ? state.merge( action.control ) : state ;
};
