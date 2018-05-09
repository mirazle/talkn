import MenuIndex from 'common/schemas/state/MenuIndex';

export default ( state = new MenuIndex() , action ) => {
	return action.menuIndex ? state.merge( action.menuIndex ) : state ;
};
