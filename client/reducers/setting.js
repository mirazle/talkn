import Setting from 'common/schemas/state/Setting';

export default ( state = new Setting() , action ) => {
	return action.setting ? state.merge( action.setting ) : state ;
};
