import User from 'common/schemas/state/User';

export default ( state = new User() , action ) => {
	// TODO WS関連もUser関連もReducerで
	// state.merge(params)してstateを更新するようにする
	return action.user ? state.merge( action.user ) : state ;
};
