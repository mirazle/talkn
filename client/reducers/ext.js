import Ext from 'common/schemas/state/ext';

export default ( state = new Ext() , action ) => {
	return action.ext ? state.merge( action.ext ) : state ;
};
