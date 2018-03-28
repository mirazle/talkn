import BootOption from 'common/schemas/state/BootOption';

export default ( state = new BootOption() , action ) => {
	return action.bootOption ? state.merge( action.bootOption ) : state ;
};
